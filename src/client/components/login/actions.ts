import * as $ from "jquery";

/**
 * @function
 * Actions(functions) for login
 * Contains all functionality of component.
 * Action attached to component through "connect" function.
 * Action can:
 *  1) Be called to run some function and then pass to function which updates store
 *  2) Update the store directly(The small funcitons which return action name and updated parameter).
 */
export default function actions() {
    function names() {
        return {
            setSending: "SET_SENDING",
            setError: "SET_ERROR"
        }
    }
    function sendLoginDetailsToServer(email: string, password: string) {
        return (dispatch: any) => {
            console.log("Send to server");
            dispatch(sending(true));
            $.ajax({
                type: 'POST',
                url: '/login',
                data: { email, password }
            }).done(function (data) {
                console.log("Sent to server pass data:" + JSON.stringify(data));
                dispatch(sending(false));
                if (data.error) {
                    addError(data.error);
                } else {
                }
            }).fail(function (a, b, c, d) {
                console.log("Sent to server fail");
                dispatch(sending(false));
                addError("Error sending to server");
            });
        }

    }

    function sending(bool: Boolean) {
        return {
            type: names().setSending,
            sending: bool
        }
    }

    function addError(error: string = null) {
        return {
            type: names().setError,
            errorMessage: error
        }
    }
    return {
        names,
        sendLoginDetailsToServer,
        sending,
        addError
    }
}