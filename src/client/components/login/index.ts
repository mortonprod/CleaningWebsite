import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from "./comp/index";
import actions from './actions';
import reducer from './reducer';


const mapStateToProps = (state: any, ownProps: any) => {
    return {
        sending: state.loginReducer.sendingLogin
    }
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        sendLoginDetailsToServer: bindActionCreators(actions().sendLoginDetailsToServer, dispatch),
        sendSignupDetailsToServer: bindActionCreators(actions().sendSignupDetailsToServer, dispatch)

    }
}
let LoginConnect = connect(mapDispatchToProps, mapDispatchToProps)(Login);
export {LoginConnect, reducer}
