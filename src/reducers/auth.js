const authReducerDefaultState = {
    loggedIn: false,
    login: '',
    userId: '',
};

const authReducer = (state = authReducerDefaultState, action) => {
    switch (action.type) {
    case 'LOGIN':
        return {
            loggedIn: true,
            login: action.login,
        };
    case 'LOGOUT':
        return {
            loggedIn: false,
            login: '',
        };
    default:
        return state;
    }
};

export default authReducer;
