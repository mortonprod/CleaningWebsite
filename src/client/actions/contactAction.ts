import * as $ from "jquery";
import Promise from "ts-promise";
export function sendMessage(name: string, email: string, message: string) {
    return (dispatch: any) => {
        dispatch(sendingMessage(true));
        let helpMessage: Array<string> = validation(name, email, message);
        ///validation code here
        if (helpMessage === []) {
            dispatch(sendMessageToServer(name, email, message));
        } else {
            dispatch(sendToStoreWithHelpMessage(name, email, message, helpMessage));
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
                dispatch(sendToStoreWithHelpMessage(name, email, message, ["Error sending to server"]));
                dispatch(sendingMessage(false));
            } else {
                dispatch(sendToStoreWithHelpMessage(name, email, message));
                dispatch(sendingMessage(false));
            }
        }).fail(function (a, b, c, d) {
            console.log("actual failure: ", a, b, c, d)
            dispatch(sendToStoreWithHelpMessage(name, email, message,["Error sending to server"]));
            dispatch(sendingMessage(false));
        });
    }

}

////////////////////////////////Action creators to update store.//////////////////////////////
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const STORE_MESSAGE = 'STORE_MESSAGE';
export const SENDING_MESSAGE = 'SENDING_MESSAGE';
function sendingMessage(bool: boolean) {
    return {
        type: SENDING_MESSAGE,
        sending:bool
    }
}


function sendToStoreWithHelpMessage(name:string,email:string,message:string,helpMessage=["completed"]){
    return {
        type: SEND_MESSAGE,
        name,
        email,
        message,
        helpMessage
    }
}

export function failMessage(name:string,email:string,message:string) {
    return {
        type: SENDING_MESSAGE,
        contactLoad: true
    }
}

