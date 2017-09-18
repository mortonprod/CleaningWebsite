import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Contact } from "./comp/index";
import actions from './actions';
import reducer from './reducer';


const mapStateToProps = (state: any, ownProps: any) => {
    return {
        name: state.globalReducer.name,
        email: state.globalReducer.email,
        message: state.contactReducer.message,
        sending: state.contactReducer.sendingMessage
    }
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        sendMessage: bindActionCreators(actions().sendMessage, dispatch)
    }
}

let ContactConnect = connect(mapDispatchToProps, mapDispatchToProps)(Contact);
export { ContactConnect, reducer }
