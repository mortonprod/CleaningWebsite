///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupPresentation from '../components/signupPresentation';
import commitSignupDetails from '../actions/signupAction';
interface props {
    commitSignupDetails:any,
    sending:any
}
class Signup extends React.Component<props, {}> {
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
                <SignupPresentation submitHandler={(form: { firstName: string, secondName: string, address: string, password: string, phoneNumber: string, email: string }) => this.props.commitSignupDetails(form.firstName, form.secondName, form.address, form.password, form.phoneNumber, form.email)}/>
            </div>
        );
    }
}
///This call back will get state from provider and map to component props.
const mapStateToProps = (state: any, ownProps: any) => {
    console.log(JSON.stringify(state));
    return {
        sending: state.signupReducer.sending
    }
}
///This will link actions and link to props in component
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        commitSignupDetails: bindActionCreators(commitSignupDetails, dispatch)
    }
}
///Need to specify connect(store, action<<Need this to use action in class)(object) 
// injects increment and decrement
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
