///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewsPresentation from '../components/reviewsPresentation';
import sendReviewToServer from '../actions/reviewsAction';
interface review { name: string, stars: number, message: string }

interface props {
    sendReviewToServer: any,
    reviews: Array<review>,
    sending: any
}
class Reviews extends React.Component<props, {}> {
    sendingClass = "";
    constructor(props: any) {
        super(props);
    }
    reviews = [{ name: "Alex", stars: 4, message: "Something like a message" }];
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
                <ReviewsPresentation reviews={this.reviews} submit={this.props.sendReviewToServer}/>
            </div>
        );
    }
}
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        sending: state.reviewsReducer.sendingReview,
        reviews: state.reviewsReducer.reviews
    }
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        sendReviewToServer: bindActionCreators(sendReviewToServer, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
