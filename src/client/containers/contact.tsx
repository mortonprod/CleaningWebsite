///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ContactPresentation from "../components/contactPresentation.tsx";
import { sendMessage } from "../actions/contactAction.ts";
interface state {
}
interface props {
    name: string,
    email: string,
    message: string,
    help: string,
    sendingClass:string
}
/**
 * Contact react component
 * @class
 */
export default class Contact extends React.Component<props, state> {
    constructor(props:any) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={this.props.sendingClass}>
                <ContactPresentation name={this.props.name} email={this.props.email} message={this.props.message}
                submitHandler={(form) => dispatch(sendMessage(form.name, form.email, form.message))}/>
                <p>{this.props.help} </p>
            </div>
        );
    }
}
/// @ function select - This will pass store from the provider and select parts of it then pass to the container component.
/// IMPORTANT:Youd do not need to add store here for this to work.
function select(store) {
    return {
        userAuthSession: store.userAuthSession
    };
}

export default connect(select)(Contact);
