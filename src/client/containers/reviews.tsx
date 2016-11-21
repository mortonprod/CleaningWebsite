///File contact - the link between the contact actions and presentation.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewsPresentation from '../components/reviewsPresentation';
import sendReviewToServer from '../actions/reviewsAction';
interface review { name: string, stars: number, message: string }

interface props {
    submit: any,
    reviews: Array<review>,
    showNumber?: number
}
interface state {
    titleStyle: string,
    initialStars: number,
    reviewsToPass: Array<review>

}
class Reviews extends React.Component<props, state> {
    constructor(props: any) {
        super(props);
    }
    initRan = false;
    static defaultProps = {
        reviews: [
            { name: "Alex1", stars: 4, message: "Something like a message" },
            { name: "Alex2", stars: 4, message: "Something like a message" },
            { name: "Alex3", stars: 4, message: "Something like a message" },
            { name: "Alex4", stars: 4, message: "Something like a message" },
            { name: "Alex5", stars: 4, message: "Something like a message" },
            { name: "Alex6", stars: 4, message: "Something like a message" },
            { name: "Alex7", stars: 4, message: "Something like a message" },
            { name: "Alex8", stars: 4, message: "Something like a message" },
            { name: "Alex9", stars: 4, message: "Something like a message" },
            { name: "Alex10", stars: 4, message: "Something like a message" },
            { name: "Alex11", stars: 4, message: "Something like a message" },
            { name: "Alex12", stars: 4, message: "Something like a message" }

        ],
        submit: null as any,
        showNumber: 5
    }
    getShowNum() {
        return this.state.reviewsToPass.length;
    }
    /**
     * @function
     * If we have more reviews then update the state to show all the review we where showing before.
     * If we have less review now then show only these
     * @param nextProps
     */
    componentWillReceiveProps(nextProps: props) {
        let tempNum: number;
        if (this.getShowNum() > nextProps.reviews.length) {
            tempNum = nextProps.reviews.length;
        } else {
            tempNum = this.getShowNum();
        }
        let temp = [] as any
        for (let i = 0; i < tempNum; i++) {
            temp.push(nextProps.reviews[i]);
        }
        this.setState({
            titleStyle: "",
            initialStars: 0,
            reviewsToPass: temp
        })
    }
    componentWillMount() {
        let temp = [] as any
        let tempNum: number;
        if (this.props.showNumber > this.props.reviews.length) {
            tempNum = this.props.reviews.length;
        } else {
            tempNum = this.props.showNumber;
        }
        for (let i = 0; i < tempNum; i++) {
            temp.push(this.props.reviews[i]);
        }
        this.setState({
            titleStyle: "",
            initialStars: 0,
            reviewsToPass: temp
        })
    }
    /**
     * Call this on hover over the component.
     * Makes the component a bit more lively.
     */
    init() {
        if (!this.initRan) {
            this.initRan = true;
            this.setState({
                titleStyle: "animated bounce",
                initialStars: this.state.initialStars,
                reviewsToPass: this.state.reviewsToPass
            });
            for (let i = 0; i < 7; i++) {
                (function (i: number) {
                    setTimeout(function () {
                        let temp: number;
                        if (i === 6) {
                            temp = 0
                        } else {
                            temp = i
                        }
                        this.setState({
                            titleStyle: this.state.titleStyle,
                            initialStars: temp,
                            reviewsToPass: this.state.reviewsToPass
                        })
                        console.log("i: " + i)
                    }.bind(this), 1000 * i)
                }.bind(this))(i)
            }
        }
    }
    showHandler(more: Boolean) {
        let newTotal: number;
        if (more) {
            newTotal =  this.getShowNum() + this.props.showNumber;
        } else {
            newTotal = this.getShowNum() - this.props.showNumber;
        }
        let tempNum: number;
        if (newTotal > this.props.reviews.length) {
            tempNum = this.props.reviews.length;
        } else {
            tempNum = newTotal;
        }
        let temp = [] as Array<review>;
        for (let i = 0; i < tempNum; i++) {
            temp.push(this.props.reviews[i]);
        }
        this.setState({
            titleStyle: this.state.titleStyle,
            initialStars: this.state.initialStars,
            reviewsToPass: temp
        })
    }
    /**
     * @function
     * Add review to list then call dispatch to store.   
     * @param rev
     */
    submit(rev: review) {
        //Remove below when we have store working
//        this.props.submit(rev)
        let temp = this.state.reviewsToPass;
        temp.push(rev);
        this.setState({
            titleStyle: this.state.titleStyle,
            initialStars: this.state.initialStars,
            reviewsToPass: temp
        })
    }
    render() {
        return (
            <div onMouseOver={() => { this.init() } }>
                <ReviewsPresentation
                    reviews={this.state.reviewsToPass}
                    submit={(rev: review) => { this.submit(rev) } }
                    titleStyle={this.state.titleStyle}
                    initialStars={this.state.initialStars}
                    showHandler = {(moreBool: Boolean) => { this.showHandler(moreBool) } }
                    />
            </div>
        );
    }
}
/**
 * @function
 * Connect the reviews from the store.
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        reviews: state.reviewsReducer.reviews
    }
}
/**
 * @function
 * Connect the submit action
 * @param dispatch
 * @param ownProps
 */
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        submit: bindActionCreators(sendReviewToServer, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
