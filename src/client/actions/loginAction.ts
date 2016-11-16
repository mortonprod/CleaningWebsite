import actionNames from "./actionNames";

export default function sendLoginDetailsToServer(email: string, password: string) {
    return (dispatch: any) => {
        console.log("Send to server");
        dispatch(sendingLoginDetails(true));
        $.ajax({
            type: 'POST',
            url: '/login',
            data: { email, password }
        }).done(function (data) {
            console.log("Sent to server pass data:" + JSON.stringify(data));
            dispatch(sendingLoginDetails(false));
            if (data.error) {
                sendingLoginDetailsSuccess(false);
            } else {
                sendingLoginDetailsSuccess(true);
            }
        }).fail(function (a, b, c, d) {
            console.log("Sent to server fail");
            dispatch(sendingLoginDetails(false));
            sendingLoginDetailsSuccess(false);
        });
    }

}

function sendingLoginDetails(bool: Boolean) {
    return {
        type: actionNames().sendingLoginDetails,
        commmitingLoginDetail:bool
    }
}

function sendingLoginDetailsSuccess(bool: Boolean = null) {
    return {
        type: actionNames().sendingLoginDetailsSuccess,
        commmitingLoginDetail: bool
    }
}
