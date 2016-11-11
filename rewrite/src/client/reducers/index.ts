import { combineReducers } from 'redux';
import { customers } from "./LoginSignupReducer.ts";

const RootReducer = combineReducers({
    customers: customers

});

export default RootReducer;
