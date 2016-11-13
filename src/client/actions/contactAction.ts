import * as $ from "jquery";
import Promise from "ts-promise";
import actionNames from "./actionNames";
export function sendMessage(name: string, email: string, message: string) {
    return (dispatch: any) => {
        dispatch(addSendingMessage(true));
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
            ///Check if using the same name as store.
            if (help !== null) {
                helpMessage.push(help)
            }
            help = null
            ///Check email has an @ sign.
            if (help !== null) {
                helpMessage.push(help)
            }
            return helpMessage;
        }
    }
}

/// @function action creator. This will send message.
function sendMessageToServer(name:string, email:string, message:string) {
    return (dispatch:any) => {
        $.ajax({
            type: 'POST',
            url: '/contact',
            data: { name, email, message }
        }).done(function (data) {
            if (data.error) {
                console.log("add todo worked but error: ", data);
                dispatch(addHelpMessage(["Error sending to server"]));
                dispatch(addSendingMessage(false));
            } else {
                dispatch(addMessage(message));
                dispatch(addSendingMessage(false));
            }
        }).fail(function (a, b, c, d) {
            console.log("actual failure: ", a, b, c, d)
            dispatch(addHelpMessage(["Error sending to server"]));
            dispatch(addSendingMessage(false));
        });
    }

}

////////////////////////////////Action creators to update store.//////////////////////////////
function addMessage(message:string) {
    return {
        type: actionNames().addMessage,
        message
    }
}
function addHelpMessage(helpMessage = ["completed"]) {
    return {
        type: actionNames().addHelpMessage,
        helpMessage
    }
}

function addSendingMessage(bool: boolean) {
    return {
        type: actionNames().addSendingMessage,
        sending:bool
    }
}
