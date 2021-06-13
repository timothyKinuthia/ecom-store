/* eslint-disable import/no-anonymous-default-export */


const INITIAL_STATE = {
    text: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SEARCH_QUERY':
            return {...state, ...action.payload}
        default:
            return state;
    }
}