import { combineReducers } from 'redux';
import { customers } from "./LoginSignupReducer";
import { createStore } from 'redux';
const RootReducer = combineReducers({
    customers: customers

});
///If we are running on client then fill with preloaded state. Otherwise use initial state from server.
var initial: any;
if (typeof window !== "undefined" && typeof window.__PRELOADED_STATE__ !== "undefined") {
    initial = window.__PRELOADED_STATE__
} else {
    initial = (function () { return; })();
    console.log("No window initial state specified. Set initial to undefined")
}
export default function store() { return createStore(RootReducer, initial) }

