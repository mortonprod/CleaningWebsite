import actionNames from "./actionNames";

export default function commitSignupDetails(firstName: string, secondName: string, address: string, password: string, phoneNumber: string, email: string) {
    return (dispatch: any) => {
        dispatch(commitingSignupDetails(true));
        $.ajax({
            type: 'POST',
            url: '/signup',
            data: { firstName,secondName, address, password,phoneNumber,email }
        }).done(function (data) {
            dispatch(commitingSignupDetails(false));
            if (data.error) {
                commitingSignupFailed(true);
            } else {
                commitingSignupPassed(true);
            }
        }).fail(function (a, b, c, d) {
            dispatch(commitingSignupDetails(false));
            commitingSignupFailed(true);
        });
    }

}

function commitingSignupDetails(bool: Boolean) {
    return {
        type: actionNames().commitingSignupDetails,
        commmitingSignupDetail:bool
    }
}

function commitingSignupPassed(bool: Boolean) {
    return {
        type: actionNames().commitSignupDetailsPassed,
        commmitingSignupDetail: bool
    }
}
function commitingSignupFailed(bool: Boolean) {
    return {
        type: actionNames().commitSignupDetailsFailed,
        commmitingSignupDetail: bool
    }
}
