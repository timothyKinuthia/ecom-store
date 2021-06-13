/* eslint-disable import/no-anonymous-default-export */
let INITIAL_STATE = [];

if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        INITIAL_STATE = JSON.parse(localStorage.getItem('cart'))
    } else {
        INITIAL_STATE = []
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return action.payload;
        default:
            return state;
    }
}