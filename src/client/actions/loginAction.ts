import actionNames from "./actionNames";

export default function commitLoginDetails(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(commitingLoginDetails(true));
        $.ajax({
            type: 'POST',
            url: '/login',
            data: { email, password }
        }).done(function (data) {
            dispatch(commitingLoginDetails(false));
            if (data.error) {
                commitingLoginFailed(true);
            } else {
                commitingLoginPassed(true);
            }
        }).fail(function (a, b, c, d) {
            dispatch(commitingLoginDetails(false));
            commitingLoginFailed(true);
        });
    }

}

function commitingLoginDetails(bool: Boolean) {
    return {
        type: actionNames().commitingLoginDetails,
        commmitingLoginDetail:bool
    }
}

function commitingLoginPassed(bool: Boolean) {
    return {
        type: actionNames().commitLoginDetailsPassed,
        commmitingLoginDetail: bool
    }
}
function commitingLoginFailed(bool: Boolean) {
    return {
        type: actionNames().commitLoginDetailsFailed,
        commmitingLoginDetail: bool
    }
}
