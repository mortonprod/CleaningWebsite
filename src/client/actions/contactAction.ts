import * as $ from "jquery";
import Promise from "ts-promise";
import actionNames from "./actionNames";
/**
 * @function
 * Store message so we don't have to rewrite it. Specify sending message; then check if we have any errors.
 * If we have no errors call send to server action; otherwise call update help message action.   
 * @param name
 * @param email
 * @param message
 */ 
export function sendMessage(name: string, email: string, message: string) {
    return (dispatch: any) => {
        dispatch(addSendingMessage(true));
        dispatch(addMessage(message));
        let helpMessage: Array<string> = validation(name, email, message);
        ///validation code here
        if (helpMessage === []) {
            dispatch(sendMessageToServer(name, email, message));
        } else {
            dispatch(addHelpMessage(helpMessage));
        }
        function validation(name: string, email: string, message: string) {
            let helpMessage: Array<string> = [];
            let help: string = null
            if (help !== null) {
                helpMessage.push(help)
            }
            help = null
            if (help !== null) {
                helpMessage.push(help)
            }
            return helpMessage;
        }
    }
}
/**
 * @function
 * Send message to server.
 * If error then dispatch this error to help message action and stop end sending message.
 * Otherwise remove message so we can write another one if needed. 
 * @param name
 * @param email
 * @param message
 */
function sendMessageToServer(name:string, email:string, message:string) {
    return (dispatch:any) => {
        $.ajax({
            type: 'POST',
            url: '/contact',
            data: { name, email, message }
        }).done(function (data) {
            if (data.error) {
                dispatch(addHelpMessage(["Error sending to server"]));
                dispatch(addSendingMessage(false));
            } else {
                dispatch(addMessage(""));
                dispatch(addSendingMessage(false));
            }
        }).fail(function (a, b, c, d) {
            dispatch(addHelpMessage(["Error sending to server"]));
            dispatch(addSendingMessage(false));
        });
    }

}
/**
 * @function
 * Action to add message
 * @param message
 */
function addMessage(message:string) {
    return {
        type: actionNames().contact.addMessage,
        message
    }
}
/**
 * @function
 * Action to add help messages
 * @param helpMessage
 */
function addHelpMessage(helpMessage = ["completed"]) {
    return {
        type: actionNames().contact.addHelpMessage,
        helpMessage
    }
}
/**
 * @function
 * Action to update sending variable.
 * @param bool
 */
function addSendingMessage(bool: boolean) {
    return {
        type: actionNames().contact.addSendingMessage,
        sending:bool
    }
}
