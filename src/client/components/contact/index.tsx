///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import ContactPresentation from './contactPresentation';
interface props {
    name: string,
    email: string,
    message: string,
    helpMessage: string,
    sending: any, 
    sendMessage:any 
}
/**
 * @class
 * Contact container will link to the presentational component contact.
 */
export class Contact extends React.Component<props, {}> {
    constructor(props: any) {
        super(props);
    }
    componentWillUpdate() {
    }
    render() {
        return (
            <div>
                <ContactPresentation helpMessage={this.props.helpMessage} sending={this.props.sending}  name={this.props.name} email={this.props.email} message={this.props.message}
                    submitHandler={(form: { name: string, email: string, message: string }) => this.props.sendMessage(form.name, form.email, form.message)}/>
            </div>
        );
    }
}