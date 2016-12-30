/// <reference path="../../../typingsMine/index.d.ts" />
import { combineReducers,createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import actionNames from "../actions/actionNames";

const initialState = <IState>{
    user: {
        name: {
            first: null,
            second: null
        },
        email: null,
        address: null,
        phoneNumber: null,
        datesAndTimes: null,
        reviews: null,
        messages: null
    },
    login: {
        sending: null,
        errorMessage: null
    },
    signup: {
        sentPassed: null,
        setSending: false
    },
    contact: {
        message: null,
        helpMessage: null,
        sendingMessage: false,
    },
    datetime: {
        newBookings: null,
        allDatesAndTimes: null,
        sending: false
    },
    reviews: {
        reviewsList: null,
        showNumber: 5,
        sendingReview: false
    }
}
function userReducer(state = initialState.user, action: any) {
    switch (action.type) {
        case actionNames().user.addName:
            return Object.assign({}, state, {
                user: {
                    name: {
                        first: action.name.first,
                        second: action.name.second
                    },
                    email: state.email,
                    address: state.address,
                    phoneNumber: state.phoneNumber,
                    datesAndTimes: state.datesAndTimes,
                    reviews: state.reviews,
                    messages: state.messages

                }
            })
        case actionNames().user.addEmail:
            return Object.assign({}, state, {
                user: {
                    name: {
                        first: state.name.first,
                        second: state.name.second
                    },
                    email: action.email,
                    address: state.address,
                    phoneNumber: state.phoneNumber,
                    datesAndTimes: state.datesAndTimes,
                    reviews: state.reviews,
                    messages: state.messages
                }
            })
        case actionNames().user.addAddress:
            return Object.assign({}, state, {
                user: {
                    name: {
                        first: state.name.first,
                        second: state.name.second
                    },
                    email: state.email,
                    address: action.address,
                    phoneNumber: state.phoneNumber,
                    datesAndTimes: state.datesAndTimes,
                    reviews: state.reviews,
                    messages: state.messages
                }
            })
        case actionNames().user.addPhoneNumber:
            return Object.assign({}, state, {
                user: {
                    name: {
                        first: state.name.first,
                        second: state.name.second
                    },
                    email: state.email,
                    address: state.address,
                    phoneNumber: action.phoneNumber,
                    datesAndTimes: state.datesAndTimes,
                    reviews: state.reviews,
                    messages: state.messages
                }
            })
        case actionNames().user.addDateTimes:
            return Object.assign({}, state, {
                user: {
                    name: {
                        first: state.name.first,
                        second: state.name.second
                    },
                    email: state.email,
                    address: state.address,
                    phoneNumber: state.phoneNumber,
                    datesAndTimes: action.datesAndTimes,
                    reviews: state.reviews,
                    messages: state.messages
                }
            })
        case actionNames().user.addReviews:
            return Object.assign({}, state, {
                user: {
                    name: {
                        first: state.name.first,
                        second: state.name.second
                    },
                    email: state.email,
                    address: state.address,
                    phoneNumber: state.phoneNumber,
                    datesAndTimes: state.datesAndTimes,
                    reviews: action.reviews,
                    messages: state.messages
                }
            })
        case actionNames().user.addMessages:
            return Object.assign({}, state, {
                user: {
                    name: {
                        first: state.name.first,
                        second: state.name.second
                    },
                    email: state.email,
                    address: state.address,
                    phoneNumber: state.phoneNumber,
                    datesAndTimes: state.datesAndTimes,
                    reviews: state.reviews,
                    messages: action.messages
                }
            })
        default:
            return state
    }
}

function contactReducer(state = initialState.contact, action: any) {
    switch (action.type) {
        case actionNames().contact.addMessage:
            return Object.assign({}, state, {
                contact: {
                    message: action.message,
                    helpMessage: state.helpMessage,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().contact.addHelpMessage:
            return Object.assign({}, state, {
                contact: {
                    message: state.message,
                    helpMessage: action.message,
                    sendingMessage: state.sendingMessage
                }
            })
        case actionNames().contact.addSendingMessage:
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

function datetimeReducer(state = initialState.datetime, action: any) {
    switch (action.type) {
        case actionNames().datetime.addNewBookings:
            return Object.assign({}, state, {
                datetime: {
                    newBooking: action.newBookings,
                    allDatesAndTimes: state.allDatesAndTimes,
                    sending: state.sending
                }
            })
        case actionNames().datetime.addAllBookings:
            return Object.assign({}, state, {
                datetime: {
                    newBooking: state.newBookings,
                    allDatesAndTimes: action.allDatesAndTimes,
                    sending: state.sending
                }
            })
        case actionNames().datetime.setSending:
            return Object.assign({}, state, {
                datetime: {
                    newBooking: state.newBookings,
                    allDatesAndTimes: state.allDatesAndTimes,
                    sending: action.sending
                }
            })
        default:
            return state
    }
}

function reviewsReducer(state = initialState.reviews, action: any) {
    switch (action.type) {
        case actionNames().reviews.addReviews:
            return Object.assign({}, state, {
                reviews: {
                    reviewsList: action.reviewList,
                    showNumber: state.showNumber,
                    sendingReview: state.sendingReview
                }
            })
        case actionNames().reviews.changeShowNumber:
            return Object.assign({}, state, {
                reviews: {
                    reviewsList: state.reviewsList,
                    showNumber: action.showNumber,
                    sendingReview: state.sendingReview
                }
            })
        case actionNames().reviews.setSending:
            return Object.assign({}, state, {
                reviews: {
                    reviewsList: state.reviewsList,
                    showNumber: state.showNumber,
                    sendingReview: action.sendingReview
                }
            })
        default:
            return state
    }
}

function loginReducer(state = initialState.login, action: any) {
    switch (action.type) {
        case actionNames().login.setSending:
            return Object.assign({}, state, {
                login: {
                    sending: action.sending,
                    errorMessage: state.errorMessage
                }
            })
        case actionNames().login.setError:
            return Object.assign({}, state, {
                login: {
                    sending: state.sending,
                    errorMessage: action.errorMessage
                }
            })
        default:
            return state
    }
}
function signupReducer(state = initialState.signup, action: any) {
    switch (action.type) {
        case actionNames().signup.sentPassed:
            return Object.assign({}, state, {
                signup: {
                    sending: action.sending,
                    errorMessage: state.sentPassed
                }
            })
        case actionNames().signup.setSending:
            return Object.assign({}, state, {
                signup: {
                    sending: state.sentPassed,
                    errorMessage: action.sentPassed
                }
            })
        default:
            return state
    }
}


const RootReducer = combineReducers({
    userReducer,
    signupReducer,
    contactReducer,
    datetimeReducer,
    reviewsReducer,
    loginReducer
});
///If we are running on client then fill with preloaded state. Otherwise use initial state from server.
var initial: any;
if (typeof window !== "undefined" && typeof window.__PRELOADED_STATE__ !== "undefined") {
    initial = window.__PRELOADED_STATE__
    console.log("Initial state: " + JSON.stringify(initial))
} else {
    initial = (function () { return; })();
    console.log("No window initial state specified. Set initial to undefined")
}
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
)(createStore);

export default function store() { return createStoreWithMiddleware(RootReducer, initial); }
