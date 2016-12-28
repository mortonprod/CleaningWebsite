///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import SignupPresentation from './signupPresentation';
interface props {
    commitSignupDetails:any,
    sending:any
}
export class Signup extends React.Component<props, {}> {
    sendingClass=""
    constructor(props: any) {
        super(props);
    }
    componentWillUpdate() {
        if (this.props.sending) {
            this.sendingClass="sending"
        } else {
            this.sendingClass = ""
        }
    }
    render() {
        return (
            <div className={this.sendingClass}>
                <SignupPresentation submitHandler={(form: { firstName: string, secondName: string, address: string, password: string, phoneNumber: string, email: string }) => this.props.commitSignupDetails(form.firstName, form.secondName, form.address, form.password, form.phoneNumber, form.email)}/>
            </div>
        );
    }
}
