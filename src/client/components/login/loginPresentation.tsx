﻿import * as React from 'react';
let Spinner: any = null;
if (typeof window === "undefined") {
    console.log("On server do not include component with css")
} else {
    let Spinner = require('react-spinkit');
}

interface props {
    submitHandler: any
    sending: Boolean;
}
export default class LoginPresentation extends React.Component<props, {}> {
    constructor(props: any) {
        super();
    }
    email: HTMLInputElement;
    password: HTMLInputElement;
    submitHandler() {
        console.log("ctrl " + this.email.value + "  " + this.password.value)
        var form = {
            email: this.email.value,
            password: this.password.value,
        }
        this.props.submitHandler(form);
    }
    render() {
        let comp: any;
        if (this.props.sending) {
            return (
                <Spinner spinnerName='double-bounce'/>
            )
        } else {
            return (
                <div className="text-center">
                    <h1 className="text-center login-title"> Sign in </h1>
                    <div className="account-wall">
                        <form className='form-signin'>
                            <input ref={(input) => this.email = input} type='text' name='email' className='form-control' placeholder='Email' required/>
                            <input ref={(input) => this.password = input} type='password'  name='password' className='form-control' placeholder='Password' required/>
                            <button onClick={this.submitHandler.bind(this)} className='btn btn-lg btn-primary btn-block'> Sign in </button>
                            <span className="clearfix"/>
                        </form>
                    </div>
                    <a href='/signup'  className='text-center new-account'> Create an account </a>
                </div>
            );
        }
    }
}