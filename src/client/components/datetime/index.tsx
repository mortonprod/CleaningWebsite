import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DateTime } from "./comp/index";
import actions from './actions';
import reducer from './reducer';

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        sending: state.datetimeReducer.sendingBooking,
        sentSuccess: state.datetimeReducer.sentBooking,
        inValidDatesAndTimes: state.datetimeReducer.allDatesAndTimes,
        yourDatesAndTimes: state.datetimeReducer.yourDatesAndTimes
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        sendBooking: bindActionCreators(actions().sendBooking, dispatch)
    }
}
let DateTimeConnect = connect(mapDispatchToProps, mapDispatchToProps)(DateTime);
export { DateTimeConnect, reducer };