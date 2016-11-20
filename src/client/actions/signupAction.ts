import actionNames from "./actionNames";

export default function commitSignupDetails(firstName: string, secondName: string, address: string, password: string, phoneNumber: string, email: string) {
    return (dispatch: any) => {
        dispatch(sentPassed(true));
        $.ajax({
            type: 'POST',
            url: '/signup',
            data: { firstName,secondName, address, password,phoneNumber,email }
        }).done(function (data) {
            dispatch(sending(false));
            if (data.error) {
                sentPassed(true);
            } else {
                sentPassed(true);
            }
            }).fail(function (a, b, c, d) {
                dispatch(sending(false));
                sentPassed(true);
        });
    }

}

function sentPassed(bool: Boolean) {
    return {
        type: actionNames().signup.sentPassed,
        sentPassed:bool
    }
}

function sending(bool: Boolean) {
    return {
        type: actionNames().signup.setSending,
        sending: bool
    }
}
