import * as $ from "jquery";
export default function actions() {
    function names() {
        return {
            addMessage: "ADD_MESSAGE",
            addHelpMessage: "ADD_HELP_MESSAGE",
            addSendingMessage: "ADD_SENDING_MESSAGE",
        }
    }
    function sendMessage(name: string, email: string, message: string) {
        return (dispatch: any) => {
            dispatch(addSendingMessage(true));
            dispatch(addMessage(message));
            dispatch(sendMessageToServer(name, email, message));
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
    function sendMessageToServer(name: string, email: string, message: string) {
        return (dispatch: any) => {
            $.ajax({
                type: 'POST',
                url: '/contact',
                data: { name, email, message }
            }).done(function (data) {
                if (data.error) {
                    dispatch(addSendingMessage(false));
                } else {
                    dispatch(addSendingMessage(false));
                }
            }).fail(function (a, b, c, d) {
                dispatch(addSendingMessage(false));
            });
        }

    }
    /**
     * @function
     * Action to add message
     * @param message
     */
    function addMessage(message: string) {
        return {
            type: names().addMessage,
            message
        }
    }
    /**
     * @function
     * Action to update sending variable.
     * @param bool
     */
    function addSendingMessage(bool: boolean) {
        return {
            type: names().addSendingMessage,
            sending: bool
        }
    }
    return {
        addSendingMessage,
        addMessage,
        sendMessageToServer,
        sendMessage,
        names
    }
}