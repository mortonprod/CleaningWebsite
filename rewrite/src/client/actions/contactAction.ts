/// <reference path="../../../typings/index.d.ts" />
import * as $ from "jquery";
import * as Promise from "promises";

export function sendMessage(name, email, message) {
    return (dispatch) => {
        dispatch(sendingMessage(true));
        validateMessage(name, email, message).then( function (name, email, message) {
            dispatch(sendMessageToServer(name, email, message));
        }, function (name, email, message, helpMessage) {
            dispatch(sendToStoreWithHelpMessage(name, email, message, helpMessage));
        })
    }
}

function validateMessage(name, email, message) {
    let helpMessage = validation(name,email,message);
    ///Put validation code here.
    return new Promise(function (resolve, reject) {
        if (helpMessage ===[]) {
            resolve(name, email, message);
        } else {
            reject(name, email, message, helpMessage);
        }
    })
    function validation(name,email,message) {
        let helpMessage = [];
        let help = null
        ///Check if using the same name as store.
        if (help !==null){
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

/// @function action creator. This will send message.
function sendMessageToServer(name, email, message) {
    return (dispatch) => {
        $.ajax({
            type: 'POST',
            url: '/contact',
            data: { name, email, message }
        }).done(function (data) {
            if (data.error) {
                console.log("add todo worked but error: ", data);
                dispatch(sendToStoreWithHelpMessage(name, email, message, "Error sending to server"));
                dispatch(sendingMessage(false));
            } else {
                dispatch(sendToStoreWithHelpMessage(name, email, message));
                dispatch(sendingMessage(false));
            }
        }).fail(function (a, b, c, d) {
            console.log("actual failure: ", a, b, c, d)
            dispatch(sendToStoreWithHelpMessage(name, email, message,"Error sending to server"));
            dispatch(sendingMessage(false));
        });
    }

}

////////////////////////////////Action creators to update store.//////////////////////////////
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const STORE_MESSAGE = 'STORE_MESSAGE';
export const SENDING_MESSAGE = 'SENDING_MESSAGE';
function sendingMessage(bool) {
    return {
        type: SENDING_MESSAGE,
        bool
    }
}


function sendToStoreWithHelpMessage(name,email,message,helpMessage="completed"){
    return {
        type: SEND_MESSAGE,
        name,
        email,
        message,
        helpMessage
    }
}

export function failMessage(name,email,message) {
    return {
        type: SENDING_MESSAGE,
        contactLoad: true
    }
}

