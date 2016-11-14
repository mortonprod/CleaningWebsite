import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import DateTimes from "../utils/datetime";
import actionNames from "../actions/actionNames";


let holder: Array<DateTimes> = [];
let holder2: Array<string> = [];
const initialState = {
    user: {
        name: "",
        email: "",
        dateTime:holder
    },
    contact: {
        message: "",
        helpMessage: holder2,
        sendingMessage: false,
    }
}
function userReducer(state = initialState.user, action: any) {
    switch (action.type) {
        case  actionNames().addName:
            return Object.assign({}, state, {
                user: {
                    name: action.name,
                    email: state.email,
                    dateTime: state.dateTime
                }
            })
        case actionNames().addEmail:
            return Object.assign({}, state, {
                user: {
                    name: state.name,
                    email: action.email,
                    dateTime: state.dateTime
                }
            })
        case actionNames().addUserDatesTimes:
            return Object.assign({}, state, {
                user: {
                    name: state.name,
                    email: state.email,
                    dateTime: action.dateTime
                }
            })
        default:
            return state
    }
}

function contactReducer(state = initialState.contact, action: any) {
    switch (action.type) {
        case actionNames().addMessage:
            return Object.assign({}, state, {
                contact: {
                    message: action.message,
                    helpMessage: state.helpMessage,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().addHelpMessage:
            return Object.assign({}, state, {
                contact: {
                    message: state.message,
                    helpMessage: action.message,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().addSendingMessage:
            return Object.assign({}, state, {
                contact: {
                    message: state.message,
                    helpMessage: state.message,
                    sendingMessage: action.sendingMessage
                }
            })
        default:
            return state
    }
}

function loginReducer(state = initialState.contact, action: any) {
    switch (action.type) {
        case actionNames().addMessage:
            return Object.assign({}, state, {
                contact: {
                    message: action.message,
                    helpMessage: state.helpMessage,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().addHelpMessage:
            return Object.assign({}, state, {
                contact: {
                    message: state.message,
                    helpMessage: action.message,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().addSendingMessage:
            return Object.assign({}, state, {
                contact: {
                    message: state.message,
                    helpMessage: state.message,
                    sendingMessage: action.sendingMessage
                }
            })
        default:
            return state
    }
}

function signupReducer(state = initialState.contact, action: any) {
    switch (action.type) {
        case actionNames().addMessage:
            return Object.assign({}, state, {
                contact: {
                    message: action.message,
                    helpMessage: state.helpMessage,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().addHelpMessage:
            return Object.assign({}, state, {
                contact: {
                    message: state.message,
                    helpMessage: action.message,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().addSendingMessage:
            return Object.assign({}, state, {
                contact: {
                    message: state.message,
                    helpMessage: state.message,
                    sendingMessage: action.sendingMessage
                }
            })
        default:
            return state
    }
}



const RootReducer = combineReducers({
    userReducer,
    contactReducer,
    loginReducer,
    signupReducer
});
///If we are running on client then fill with preloaded state. Otherwise use initial state from server.
var initial: any;
if (typeof window !== "undefined" && typeof window.__PRELOADED_STATE__ !== "undefined") {
    initial = window.__PRELOADED_STATE__
} else {
    initial = (function () { return; })();
    console.log("No window initial state specified. Set initial to undefined")
}
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
)(createStore);

export default function store() { return createStoreWithMiddleware(RootReducer, initial); }
