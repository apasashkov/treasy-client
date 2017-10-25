import axios from 'axios';
import Auth from '../utils/Auth';
import { baseUrl } from '../config/config';

const authConfig = () => ({
    'Authorization': `bearer ${Auth.getToken()}`
});

const addGroups = (groups) => ({
    type: 'ADD_GROUPS',
    groups,
});

// GET_GROUPS
export const startGetGroups = () => {
    return (dispatch) => {
        axios.get(`${baseUrl}/api/groups`)
        .then((response) => {
            const groups = response.data;
            groups.map((group) => {
                group.groupId = group._id;
                delete group._id;
                group.cards.map((card) => {
                    card.cardId = card._id;
                    delete card._id;
                });
            });

            dispatch(addGroups(groups));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

// ADD_GROUP
const addGroup = (group) => ({
    type: 'ADD_GROUP',
    group,
});

export const startAddGroup = (cardGroupData = {}) => {
    // works only after redux-thunk installed
    return (dispatch) => {
        const { title = 'Group Title', cards = [] } = cardGroupData;
        const cardGroup = { title, cards };
        axios.post(`${baseUrl}/api/groups`, cardGroup, {headers: authConfig()} )
        .then((response) => {
            dispatch(addGroup({
                ...cardGroup,
                groupId:response.data._id,
            }));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

// EDIT_GROUP
const editGroup = (groupId, updates) => ({
    type: 'EDIT_GROUP',
    groupId,
    updates,
});

export const startEditGroup = (groupId, updates) => {
    return (dispatch) => {
        axios.post(`${baseUrl}/api/groups/${groupId}`, updates, {headers: authConfig()})
        .then(() => {
            dispatch(editGroup(groupId, updates));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

// REMOVE_GROUP
const removeGroup = ({ groupId } = {}) => ({
    type: 'REMOVE_GROUP',
    groupId,
});

export const startRemoveGroup = ({ groupId } = {}) => {
    return (dispatch) => {
        axios.delete(`${baseUrl}/api/groups`, { params: { id: groupId }, headers: authConfig()})
        .then(() => {
            dispatch(removeGroup( { groupId }));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

// ADD_CARD
const addCard = (groupId, card) => ({
    type: 'ADD_CARD',
    groupId,
    card,
});

export const startAddCard = (groupId, cardData = {}) => {
    return (dispatch) => {
        const { cardTitle = 'My card', dueDate = 0, description = '' } = cardData;
        const card = { cardTitle, dueDate, description, groupId, };
        const data = {
            card,
            groupId,
        };
        axios.post(`${baseUrl}/api/cards`, data, {headers: authConfig()} )
        .then((response) => {
            dispatch(addCard(groupId, {
                ...card,
                cardId:response.data._id,
            }));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

// EDIT_CARD
const editCard = (cardId, updates) => ({
    type: 'EDIT_CARD',
    cardId,
    updates,
});

export const startEditCard = (cardId, updates) => {
    return (dispatch) => {
        axios.post(`${baseUrl}/api/cards/${cardId}`, updates, {headers: authConfig()})
        .then(() => {
            dispatch(editCard(cardId, updates));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

//MOVE_CARD
export const moveCard = (newGroups) => ({
    type: 'MOVE_CARD',
    newGroups,
});

export const startMoveCard = (lastX, lastY, nextX, nextY) => {
    return (dispatch, getState) => {
        const newGroups = [...getState().groups];
        if (lastX === nextX) {
          newGroups[lastX].cards.splice(nextY, 0, newGroups[lastX].cards.splice(lastY, 1)[0]);
        } else {
          // move element to new place
          newGroups[nextX].cards.splice(nextY, 0, newGroups[lastX].cards[lastY]);
          // delete element from old place
          newGroups[lastX].cards.splice(lastY, 1);
        }
        // return newGroups;
        const newGroupsToServer = [ newGroups[lastX], newGroups[nextX] ].map((group) => {
            return {
                groupId: group.groupId,
                cards: group.cards.map((card) => card.cardId )
            };
        });
        axios.post(`${baseUrl}/api/groups/moveCards`, newGroupsToServer, {headers: authConfig()})
        .then(() => {
            dispatch(moveCard(newGroups));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

// REMOVE_CARD
const removeCard = ({ cardId } = {}) => ({
    type: 'REMOVE_CARD',
    cardId,
});

export const startRemoveCard = ({ cardId } = {}) => {
    return (dispatch) => {
        axios.delete(`${baseUrl}/api/cards`, { params: { id: cardId }, headers: authConfig()})
        .then(() => {
            dispatch(removeCard( { cardId }));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};
