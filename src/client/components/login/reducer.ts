/**
 * The login reducer specifies how the login actions should change state.
 * The state will be provided by the "Provider" component which has the store on client.
 * @function 
 * @param state
 * @param action
 */
import actions from "./actions";
let loginInit = {
    sending: null as any,
    errorMessage: null as any
};


export default function loginReducer(state = loginInit, action: any) {
    switch (action.type) {
        case actions().names().setSending:
            return Object.assign({}, state, {
                login: {
                    sending: action.sending,
                    errorMessage: state.errorMessage
                }
            })
        case actions().names().setError:
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
