import * as React from 'react';

interface props {
    submitHandler: any
}
export default class SignupPresentation extends React.Component<props, {}> {
    constructor(props: any) {
        super();
    }
    ctrls: {
        firstName?: HTMLInputElement;
        secondName?: HTMLInputElement;
        address?: HTMLTextAreaElement;
        password?: HTMLInputElement;
        phoneNumber?: HTMLInputElement;
        email?: HTMLInputElement;
    } = {};
    submitHandler() {
        var form = {
            firstName: this.ctrls.firstName.value,
            secondName: this.ctrls.secondName.value,
            address: this.ctrls.address.value,
            password: this.ctrls.password.value,
            phoneNumber: this.ctrls.phoneNumber.value,
            email: this.ctrls.email.value,
        }
        this.props.submitHandler(form);
    }
    render() {
        return (
            <form id = "signupForm" action='/signup' method='POST'>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label> First Name </label>
                            <input ref={(input) => this.ctrls.firstName = input} name="name" type="text" placeholder="Enter First Name Here.." className="form-control"/>
                        </div>
                        <div className="col-sm-6 form-group">
                            <label> Last Name </label>
                            <input ref={(input) => this.ctrls.secondName = input} type="text" placeholder="Enter Last Name Here.." className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label> Address </label>
                        <textarea ref={(input) => this.ctrls.address = input} placeholder="Enter Address Here.." rows={3} className="form-control"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label> Password </label>
                            <input ref={(input) => this.ctrls.password = input} name="password" type="text" placeholder="Enter Designation Here.." className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label> Phone Number </label>
                    <input ref={(input) => this.ctrls.phoneNumber = input} type="text" placeholder="Enter Phone Number Here.." className="form-control"/>
                </div>
                <div className="form-group">
                    <label> Email Address </label>
                    <input ref={(input) => this.ctrls.email = input} name="email" type="text" placeholder="Enter Email Address Here.." className="form-control"/>
                </div>
                <button type="submit" className="btn btn-lg btn-info" onClick={this.submitHandler}> Submit	</button>				
            </form>
        );
    }
}
