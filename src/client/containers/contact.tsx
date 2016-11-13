///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactPresentation from '../components/contactPresentation';
import { sendMessage } from '../actions/contactAction';
interface props {
    name: string,
    email: string,
    message: string,
    helpMessage: string,
    sending: any,
    sendMessage:any
}
class Contact extends React.Component<props, {}> {
    sendingClass=""
    constructor(props: any) {
        super(props);
    }
    componentWillUpdate() {
        if (this.props.sending) {
            this.sendingClass="sending"
        } else {
            this.sendingClass = ""
        }
    }
    render() {
        return (
            <div className={this.sendingClass}>
                <ContactPresentation name={this.props.name} email={this.props.email} message={this.props.message}
                    submitHandler={(form: { name: string, email: string, message: string }) => this.props.sendMessage(form.name, form.email, form.message)}/>
                <p>{this.props.helpMessage} </p>
            </div>
        );
    }
}
///This call back will get state from provider and map to component props.
const mapStateToProps = (state: any, ownProps: any) => {
    console.log(JSON.stringify(state));
    return {
        name: state.userReducer.name,
        email: state.userReducer.email,
        message: state.contactReducer.message,
        helpMessage:state.contactReducer.helpMessage,
        sending:state.contactReducer.sendingMessage
    }
}
///This will link actions and link to props in component
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        sendMessage: bindActionCreators(sendMessage, dispatch)
    }
}
///Need to specify connect(store, action<<Need this to use action in class)(object) 
// injects increment and decrement
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
