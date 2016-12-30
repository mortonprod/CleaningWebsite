///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import LoginPresentation from './loginPresentation';
interface props {
    sendLoginDetailsToServer:any,
    sending: any
}
export class Login extends React.Component<props, {}> {
    constructor(props: any) {
        super(props);
    }
    componentWillUpdate() {
    }
    render() {
        return (
            <div>
                <LoginPresentation sending={this.props.sending} submitHandler={(form: { email: string, password: string }) => this.props.sendLoginDetailsToServer(form.email,form.password)}/>
            </div>
        );
    }
}