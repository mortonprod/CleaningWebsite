///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import LoginPresentation from './loginPresentation';
interface props {
    sendLoginDetailsToServer:any,
    sending: any
}
export class Login extends React.Component<props, {}> {
    sendingClass = "";
    constructor(props: any) {
        super(props);
    }
    componentWillUpdate() {
        if (this.props.sending) {
            this.sendingClass = "sending"
        } else {
            this.sendingClass = ""
        }
    }
    render() {
        return (
            <div className={this.sendingClass}>
                <LoginPresentation submitHandler={(form: { email: string, password: string }) => this.props.sendLoginDetailsToServer(form.email,form.password)}/>
            </div>
        );
    }
}