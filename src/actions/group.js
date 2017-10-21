import axios from 'axios';

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
        axios.post('http://localhost:8000/api/groups', cardGroup )
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
        axios.post(`http://localhost:8000/api/groups/${groupId}`, updates)
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
        axios.delete('http://localhost:8000/api/groups', { params: { id: groupId }})
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
        const card = { cardTitle, dueDate, description }
        const data = {
            card,
            groupId,
        };
        axios.post('http://localhost:8000/api/cards', data )
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
        axios.post(`http://localhost:8000/api/cards/${cardId}`, updates)
        .then(() => {
            dispatch(editCard(cardId, updates));
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
        axios.delete('http://localhost:8000/api/cards', { params: { id: cardId }})
        .then(() => {
            dispatch(removeCard( { cardId }));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};
