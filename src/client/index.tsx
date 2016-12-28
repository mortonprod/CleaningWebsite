/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Get actions for each component ready to add.
import { sendMessage } from './actions/contactAction';
import sendBooking from './actions/datetimeAction';
import sendLoginDetailsToServer from './actions/loginAction';
import sendReviewToServer from './actions/reviewsAction';
import commitSignupDetails from './actions/signupAction';
//Get store which will be empty on server of filled on client.
import store from './reducers/index';
//Get components to connect to store and actions
import { Contact } from "./components/contact/index";
import { DateTime } from "./components/datetime/index";
import { Login } from "./components/login/index";
import { Signup } from "./components/signup/index";
import { Reviews } from "./components/reviews/index";

const ContactWithData = () => {
    const mapStateToProps = (state: any, ownProps: any) => {
        return {
            name: state.userReducer.name,
            email: state.userReducer.email,
            message: state.contactReducer.message,
            helpMessage: state.contactReducer.helpMessage,
            sending: state.contactReducer.sendingMessage
        }
    }
    const mapDispatchToProps = (dispatch: any, ownProps: any) => {
        return {
            sendMessage: bindActionCreators(sendMessage, dispatch)
        }
    }

    let ContactConnect = connect(mapStateToProps, mapDispatchToProps)(Contact);
    return (
        <Provider store={store()} >
            <ContactConnect/>
        </Provider>
    )
}
const DateTimeWithData = () => {
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
            sendBooking: bindActionCreators(sendBooking, dispatch)
        }
    }
    let DateTimeConnect = connect(mapStateToProps, mapDispatchToProps)(DateTime);

    return (
        <Provider store={store()} >
            <DateTimeConnect/>
        </Provider>
    )
}
const LoginWithData = () => {
    const mapStateToProps = (state: any, ownProps: any) => {
        return {
            sending: state.loginReducer.sendingLogin
        }
    }
    const mapDispatchToProps = (dispatch: any, ownProps: any) => {
        return {
            sendLoginDetailsToServer: bindActionCreators(sendLoginDetailsToServer, dispatch)
        }
    }
    let LoginConnect = connect(mapStateToProps, mapDispatchToProps)(Login);
    return (
        <Provider store={store()} >
            <LoginConnect/>
        </Provider>
    )
}
const ReviewsWithData = () => {
    const mapStateToProps = (state: any, ownProps: any) => {
        return {
            reviews: state.reviewsReducer.reviews
        }
    }
    const mapDispatchToProps = (dispatch: any, ownProps: any) => {
        return {
            submit: bindActionCreators(sendReviewToServer, dispatch)
        }
    }
    let ReviewsConnect = connect(mapStateToProps, mapDispatchToProps)(Reviews);
    return (
        <Provider store={store()} >
            <ReviewsConnect/>
        </Provider>
    )
};
const SignupWithData = () =>{
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
    let SignupConnect = connect(mapStateToProps, mapDispatchToProps)(Signup);
    return (
        <Provider store={store()} >
            <SignupConnect/>
        </Provider>
    )

}
export { ContactWithData,DateTimeWithData,LoginWithData,ReviewsWithData,SignupWithData };