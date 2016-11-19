import actionNames from "./actionNames";

export default function sendLoginDetailsToServer(email: string, password: string) {
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
        type: actionNames().login.setSending,
        sending:bool
    }
}

function addError(error:string  = null) {
    return {
        type: actionNames().login.setError,
        errorMessage:error
    }
}
