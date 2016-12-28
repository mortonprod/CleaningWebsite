declare interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}
declare interface JQuery {
    smoothState(target: Object): any;
    affix(target: Object): any;
    scrollspy(target: Object): any;

}


interface Window { __PRELOADED_STATE__: any; }


interface IState {
    user: {
        name: {
            first: string,
            second: string
        },
        email: string,
        address: string,
        phoneNumber: string,
        datesAndTimes: Array<moment.Moment>,
        reviews: any,
        messages: Array<string>
    },
    login: {
        sending: Boolean,
        errorMessage: Boolean
    },
    signup: {
        sentPassed: Boolean,
        setSending: Boolean
    }
    contact: {
        message: string,
        helpMessage: string,
        sendingMessage: Boolean
    },
    datetime: {
        newBookings: Array<moment.Moment>,
        allDatesAndTimes: Array<moment.Moment>,
        sending: Boolean
    },
    reviews: {
        reviewsList: any,
        showNumber: number,
        sendingReview: Boolean
    }
}