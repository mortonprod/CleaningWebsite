import actions from "./actions";

let contactInit = {
    message: null as string,
    sendingMessage: false as Boolean,
}


export default function contactReducer(state = contactInit, action: any) {
    switch (action.type) {
        case actions().names().addMessage:
            return Object.assign({}, state, {
                contact: {
                    message: action.message,
                    helpMessage: state.helpMessage,
                    sendingMessage: state.sendingMessage
                }
            })
        case actions().names().addSendingMessage:
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
