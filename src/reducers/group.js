const groupReducerDefaultState = [];

const groupReducer = (state = groupReducerDefaultState, action) => {
    switch (action.type) {
    case 'ADD_GROUPS':
        return [...state, ...action.groups];
    case 'ADD_GROUP':
        return [...state, action.group];
    case 'EDIT_GROUP':
        return state.map((group) => {
            if (group.groupId === action.groupId) {
                return {
                    ...group,
                    ...action.updates,
                };
            }
            return group;
        });
    case 'REMOVE_GROUP':
        return state.filter(({ groupId }) => groupId !== action.groupId);
    case 'ADD_CARD':
        return state.map((group) => {
            if (group.groupId === action.groupId) {
                return { ...group,
                    cards: [...group.cards, action.card],
                };
            }
            return group;
        });
    case 'MOVE_CARD':
        return [...action.newGroups];
    case 'REMOVE_CARD':
        return state.map((group) => {
            return {
                ...group,
                cards: group.cards.filter(card => card.cardId !== action.cardId),
            };
        });
    case 'EDIT_CARD':
        return state.map((group) => {
            return {
                ...group,
                cards: group.cards.map((card) => {
                    if (card.cardId === action.cardId) {
                        return {
                            ...card,
                            ...action.updates,
                        };
                    }
                    return card;
                }),
            };
        });
    default:
        return state;
    }
};

export default groupReducer;
