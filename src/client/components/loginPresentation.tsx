import * as React from 'react';

interface props {
    submitHandler: any
}
export default class LoginPresentation extends React.Component<props, {}> {
    constructor(props: any) {
        super();
    }
    ctrls: {
        email?: HTMLInputElement;
        password?: HTMLInputElement;
    } = {};
    submitHandler() {
        var form = {
            name: this.ctrls.email.value,
            email: this.ctrls.password.value,
        }
        this.props.submitHandler(form);
    }
    render() {
        return (
            <div>
                <h1 className="text-center login-title"> Sign in </h1>
                <div className="account-wall">
                    <img className="profile-img" src="'https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120'"/>
                    <form className='form-signin' action='/login' method='POST'>
                        <input ref={(input) => this.ctrls.email = input} type='text' name='email' className='form-control' placeholder='Email' required  autofocus/>
                        <input ref={(input) => this.ctrls.password = input} type='password'  name='password' className='form-control' placeholder='Password' required/>
                        <button onClick={this.submitHandler} className='btn btn-lg btn-primary btn-block'> Sign in </button>
                        <span className="clearfix"/>
                    </form>
                </div>
                <a href='/signup'  className='text-center new-account'> Create an account </a>
            </div>
        );
    }
}
