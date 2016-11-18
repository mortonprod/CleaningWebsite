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
/**
 * @class
 * Contact container will link to the presentational component contact.
 */
class Contact extends React.Component<props, {}> {
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
/**
 * @function
 * Connect user and contact state.
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        name: state.userReducer.name,
        email: state.userReducer.email,
        message: state.contactReducer.message,
        helpMessage:state.contactReducer.helpMessage,
        sending:state.contactReducer.sendingMessage
    }
}
/**
 * @function
 * Connect sendMessage action
 * @param dispatch
 * @param ownProps
 */
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        sendMessage: bindActionCreators(sendMessage, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
