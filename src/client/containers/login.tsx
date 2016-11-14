///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPresentation from '../components/loginPresentation';
import commitLoginDetails from '../actions/loginAction';
interface props {
    commitLoginDetails:any,
    sending: any
}
class Login extends React.Component<props, {}> {
    sendingClass = ""
    constructor(props: any) {
        super(props);
    }
    componentWillUpdate() {
        if (this.props.sending) {
            this.sendingClass = "sending"
        } else {
            this.sendingClass = ""
        }
    }
    render() {
        return (
            <div className={this.sendingClass}>
                <LoginPresentation submitHandler={(form: { email: string, password: string }) => this.props.commitLoginDetails(form.email,form.password)}/>
            </div>
        );
    }
}
///This call back will get state from provider and map to component props.
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        sending: state.loginReducer.sendingLogin
    }
}
///This will link actions and link to props in component
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        commitLoginDetails: bindActionCreators(commitLoginDetails, dispatch)
    }
}
///Need to specify connect(store, action<<Need this to use action in class)(object) 
// injects increment and decrement
export default connect(mapStateToProps, mapDispatchToProps)(Login);
