import { combineReducers } from 'redux';
import userReducer from './userReducer';
import searchReducer from './searchReducer';
import cartReducer from './cartReducer';
import drawerReducer from './drawerReducer';
import { couponReducer } from './couponReducer';

export default combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupons: couponReducer
})