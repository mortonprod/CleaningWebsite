import actionNames from "./actionNames";

export default function sendingReview(email: string, password: string) {
    return (dispatch: any) => {
        console.log("Send to server");
        $.ajax({
            type: 'POST',
            url: '/login',
            data: { email, password }
        }).done(function (data) {
            console.log("Sent to server pass data:" + JSON.stringify(data));
            if (data.error) {
                sendingLoginDetailsSuccess(false);
            } else {
                sendingLoginDetailsSuccess(true);
            }
        }).fail(function (a, b, c, d) {
            console.log("Sent to server fail");
            sendingLoginDetailsSuccess(false);
        });
    }

}

function reviews(bool: Boolean) {
    return {
        type: actionNames().reviews.setSending,
        commmitingLoginDetail:bool
    }
}

function sendingLoginDetailsSuccess(bool: Boolean = null) {
    return {
        type: actionNames().reviews.setSending,
        commmitingLoginDetail: bool
    }
}
