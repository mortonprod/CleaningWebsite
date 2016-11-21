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
    sending: any,
    showNumber: number
}
interface state {
    titleStyle: string,
    initialStars: number,
    reviewsToPass: Array<review>

}
class Reviews extends React.Component<props, state> {
    sendingClass = "";
    constructor(props: any) {
        super(props);
    }
    counterToShow = 1;
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
        sendReviewToServer: null as any,
        sending: false,
        showNumber: 5
    }
    componentWillUpdate() {
        if (this.props.sending) {
            this.sendingClass = "sending"
        } else {
            this.sendingClass = ""
        }
    }
    componentWillMount() {
        let temp = [] as any
        for (let i = 0; i < this.props.showNumber; i++) {
            temp.push(this.props.reviews[i]);
        }
        this.setState({
            titleStyle: "",
            initialStars: 0,
            reviewsToPass: temp
        })
    }
    init() {
        console.log("Over");
        this.setState({
            titleStyle: "animated bounce",
            initialStars: 0,
            reviewsToPass: this.state.reviewsToPass
        })
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
                        titleStyle: "animated bounce",
                        initialStars: temp
                    })
                    console.log("i: " + i)
                }.bind(this), 1000 * i)
            }.bind(this))(i)
        }
    }
    showHandler(more:Boolean) {
        console.log("more :" + more)
        if(more){
            this.counterToShow += 1;
            let tempLength: number;
            if (this.props.showNumber * this.counterToShow <= this.props.reviews.length) {
                tempLength = this.props.showNumber * this.counterToShow
            } else {
                tempLength = this.props.reviews.length
            }
            let temp = [] as any;
            for (let i = 0; i < tempLength; i++) {
                temp.push(this.props.reviews[i]);
            }
            this.setState({
                titleStyle: "",
                initialStars: 0,
                reviewsToPass: temp
            })
        }else{
            let tempLength: number;
            if (this.props.showNumber <= this.state.reviewsToPass.length) {
                tempLength = this.props.showNumber
            } else {
                tempLength = this.state.reviewsToPass.length
            }
            let temp = this.state.reviewsToPass;
            for (let i = 0; i < tempLength; i++) {
                temp.pop();
            }
            this.setState({
                titleStyle: "",
                initialStars: 0,
                reviewsToPass: temp
            })
        }
    }
    render() {
        return (
            <div onMouseOver={this.init.bind(this)}>
                <ReviewsPresentation
                    reviews={this.state.reviewsToPass}
                    submit={this.props.sendReviewToServer}
                    titleStyle={this.state.titleStyle}
                    initialStars={this.state.initialStars}
                    showHandler = {this.showHandler.bind(this)}
                    />
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
