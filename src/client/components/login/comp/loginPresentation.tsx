import * as React from 'react';
enum Options {
    signupOrLogin,
    signup,
    login,
    loggedIn
}
interface props {
    loginHandler: Function;
    signupHandler: Function;
    optionHandler: Function;
    sending: Boolean;
    option: Options;
}
export default class LoginPresentation extends React.Component<props, {}> {
    constructor() {
        super();
    }
    email: HTMLInputElement;
    password: HTMLInputElement;
    ctrls: {
        firstName?: HTMLInputElement;
        secondName?: HTMLInputElement;
        address?: HTMLTextAreaElement;
        password?: HTMLInputElement;
        phoneNumber?: HTMLInputElement;
        email?: HTMLInputElement;
    } = {};

    submitHandler() {
        let form = null;
        if (this.props.option === Options.login) {
            form = {
                email: this.email.value,
                password: this.password.value,
            }
            this.props.loginHandler(form);
        }
        if (this.props.option === Options.signup) {
            form = {
                firstName: this.ctrls.firstName.value,
                secondName: this.ctrls.secondName.value,
                address: this.ctrls.address.value,
                password: this.ctrls.password.value,
                phoneNumber: this.ctrls.phoneNumber.value,
                email: this.ctrls.email.value,
            }
            this.props.signupHandler(form);
        }
    }
    optionHandler(option: Options) {
        console.log("pres op: " + option);
        this.props.optionHandler(option);
    }
    render() {
        if (this.props.sending) {
            return (
                <div>Wait</div>
            )
        }
        if (this.props.option === Options.signupOrLogin) {
            return (
                <div>
                    <button onClick={this.optionHandler.bind(this, Options.login)} className='btn btn-lg btn-primary btn-block'> Signup </button>
                    <button onClick={this.optionHandler.bind(this, Options.signup)} className='btn btn-lg btn-primary btn-block'> Login </button>
                </div>
            )
        }
        if (this.props.option === Options.login) {
            return (
                <div className="text-center">
                    <h1 className="text-center login-title"> Sign in </h1>
                    <div className="account-wall">
                        <form className='form-signin'>
                            <input ref={(input) => this.email = input} type='text' name='email' className='form-control' placeholder='Email' required />
                            <input ref={(input) => this.password = input} type='password' name='password' className='form-control' placeholder='Password' required />
                            <button onClick={this.submitHandler.bind(this)} className='btn btn-lg btn-primary btn-block'> Sign in </button>
                            <span className="clearfix" />
                        </form>
                    </div>
                    <a href='/signup' className='text-center new-account'> Create an account </a>
                </div>
            );
        }
        if (this.props.option === Options.signup) {
            return (
                <form id="signupForm" className="text-center">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label> First Name </label>
                                <input ref={(input) => this.ctrls.firstName = input} name="name" type="text" placeholder="Enter First Name Here.." className="form-control" />
                            </div>
                            <div className="col-sm-6 form-group">
                                <label> Last Name </label>
                                <input ref={(input) => this.ctrls.secondName = input} type="text" placeholder="Enter Last Name Here.." className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label> Address </label>
                            <textarea ref={(input) => this.ctrls.address = input} placeholder="Enter Address Here.." rows={3} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label> Password </label>
                            <input ref={(input) => this.ctrls.password = input} name="password" type="text" placeholder="Enter Password Here.." className="form-control" />
                        </div>
                        <div className="form-group">
                            <label> Phone Number </label>
                            <input ref={(input) => this.ctrls.phoneNumber = input} type="text" placeholder="Enter Phone Number Here.." className="form-control" />
                        </div>
                        <div className="form-group">
                            <label> Email Address </label>
                            <input ref={(input) => this.ctrls.email = input} name="email" type="text" placeholder="Enter Email Address Here.." className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-info" onClick={this.submitHandler}> Submit	</button>
                    </div>
                </form>
            )
        }
    }
}
