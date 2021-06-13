/* eslint-disable import/no-anonymous-default-export */


const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGGED_IN_USER':
            return action.payload;
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state;
    }
}