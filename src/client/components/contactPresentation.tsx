import  * as React from 'react';
interface props {
    name: string,
    email: string,
    message: string,
    submitHandler: any

}
export default class ContactPresentation extends React.Component<props, {}> {
    constructor(props: any) {
        super();
    }
    ctrls: {
        name?: HTMLInputElement;
        email?: HTMLInputElement;
        message?: HTMLTextAreaElement;
    } = {};
    submitHandler() {
        var form = {
            name: this.ctrls.name.value,
            email: this.ctrls.email.value,
            message: this.ctrls.message.value,
        }
        this.props.submitHandler(form);
    }

    render() {
        return (
                <form name="sentMessage" id="contactForm" noValidate>
                    <div className="row control-group">
                        <div className="form-group col-xs-12 floating-label-form-group controls">
                        <label>Name</label>
                        <input ref={(input) => this.ctrls.name = input} defaultValue={this.props.name} type="text" className="form-control" placeholder="Name" id="name" required data-validation-required-message="Please enter your name."/>
                        </div>
                    </div>
                    <div className="row control-group">
                        <div className="form-group col-xs-12 floating-label-form-group controls">
                        <label>Email Address</label>
                        <input ref={(input) => this.ctrls.email = input} defaultValue={this.props.email} type="email" className="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address."/>
                        </div>
                    </div>
                    <div className="row control-group">
                        <div className="form-group col-xs-12 floating-label-form-group controls">
                        <label>Message</label>
                        <textarea ref={(input) => this.ctrls.message = input} defaultValue={this.props.message}  rows={5} className="form-control" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
                        </div>
                    </div>
                    <br/>
                    <div id="success"></div>
                    <div className="row">
                    <div className="form-group col-xs-12">
                        <button onClick={this.submitHandler} className="btn btn-success btn-lg">Send</button>
                        </div>
                    </div>
                </form>
        );
    }
}
