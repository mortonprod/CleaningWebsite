import * as React from 'react';
interface props {
    name: string,
    email: string,
    message: string,
    submitHandler: any,
    sending: Boolean,

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
        if (this.props.sending) {
            return (
                <div>Wait</div>
            )
        } else {
            return (
                <div>
                    <form name="sentMessage">
                        <div className="row control-group">
                            <div className="form-group col-xs-12 floating-label-form-group controls">
                                <label>Name</label>
                                <input ref={(input) => this.ctrls.name = input}
                                    defaultValue={this.props.name}
                                    type="text"
                                    className="form-control"
                                    placeholder="Name" id="name"
                                    required />
                            </div>
                        </div>
                        <div className="row control-group">
                            <div className="form-group col-xs-12 floating-label-form-group controls">
                                <label>Email Address</label>
                                <input ref={(input) => this.ctrls.email = input}
                                    defaultValue={this.props.email}
                                    type="email" required
                                    className="form-control"
                                    placeholder="Email Address" />
                            </div>
                        </div>
                        <div className="row control-group">
                            <div className="form-group col-xs-12 floating-label-form-group controls">
                                <label>Message</label>
                                <textarea ref={(input) => this.ctrls.message = input}
                                    defaultValue={this.props.message}
                                    rows={5} required
                                    className="form-control">
                                </textarea>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="form-group col-xs-12">
                                <button onClick={this.submitHandler} className="btn btn-success btn-lg">
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}
