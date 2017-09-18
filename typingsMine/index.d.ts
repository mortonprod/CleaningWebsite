//declare interface ObjectConstructor {
//    assign(target: any, ...sources: any[]): any;
//}

declare interface JQuery {
    smoothState(target: Object): any;
    affix(target: Object): any;
    scrollspy(target: Object): any;

}

//interface NodeRequire {
//    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
//}


interface Window { __REDUX_STATE__: any; }

/**
  * Define the state for the app which is used in the reducer on client and db on server.
  */
interface IGlobal {
    globalReducer: {
        name: {
            first: string,
            second: string
        },
        email: string,
        password: string,
        address: string,
        phoneNumber: string,
        datesAndTimes: any,
        reviews: any,
        messages: Array<string>
    }
}
interface ILogin {
    loginReducer: {
        login: {
            sending: Boolean,
            errorMessage: Boolean
        }
    }
}
interface IContact {
    contactReducer: {
        contact: {
            message: string,
            helpMessage: string,
            sendingMessage: Boolean
        }
    }
}
interface IDatetime {
    datetimeReducer: {
        datetime: {
            newBookings: Array<any>,
            allDatesAndTimes: Array<any>,
            sending: Boolean
        }
    }
}
interface IReview {
    reviewReducer: {
        reviews: {
            reviewsList: any,
            showNumber: number,
            sendingReview: Boolean
        }
    }
}
interface IComp extends ILogin, IReview, IDatetime, IContact { }
interface IState extends IGlobal, ILogin, IReview, IDatetime, IContact { }