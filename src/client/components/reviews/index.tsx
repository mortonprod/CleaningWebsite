import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Reviews } from "./comp/index";
import actions from './actions';
import reducer from './reducer';

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        reviews: state.reviewsReducer.reviews
    }
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        submit: bindActionCreators(actions().sendingReview, dispatch)
    }
}
let ReviewConnect = connect(mapDispatchToProps, mapDispatchToProps)(Reviews);

export {ReviewConnect, reducer}
