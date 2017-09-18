///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import LoginPresentation from './loginPresentation';
enum Options {
    signupOrLogin,
    signup,
    login,
    loggedIn
}

interface props {
    sendLoginDetailsToServer: Function,
    sendSignupDetailsToServer: Function;
    sending: Boolean
}
interface state {
    option: Options;
}
export class Login extends React.Component<props, state> {
    constructor() {
        super();
        this.state = { option: Options.signupOrLogin };
    }
    checkLogin(form: { email: string, password: string }){ 
        this.props.sendLoginDetailsToServer(form)
    }
    checkSignup(form: { firstname: string, secondName: string; address: string; password: string; phoneNumber: string; email: string }) {
        this.props.sendSignupDetailsToServer(form)
    }
    componentWillUpdate() {
    }
    render() {
        return (
            <div>
                <LoginPresentation
                    optionHandler={(option: Options) => { console.log("index op: " + option); this.setState({ option: option }) } } 
                    option={this.state.option}
                    sending={this.props.sending}
                    loginHandler={(form: { email: string, password: string }) => this.checkLogin(form)}
                    signupHandler={(form: { firstname: string, secondName: string; address: string; password: string; phoneNumber: string; email: string }) => this.checkSignup(form)}
                />
            </div>
        );
    }
}