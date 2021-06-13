/* eslint-disable import/no-anonymous-default-export */

const INITIAL_STATE = false

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_VISIBLE':
            return action.payload;
        default:
            return state;
    }
}