export default function actionNames() {
    return {
        user: {
            addName: "ADD_NAME",
            addEmail: "ADD_EMAIL",
            addAddress: "ADD_ADDRESS",
            addPhoneNumber: "ADD_PHONE_NUMBER",
            addDateTimes: "ADD_DATE_TIMES",
            addReviews: "ADD_REVIEWS",
            addMessages: "ADD_MESSAGES"
        },
        login: {
            setSending: "SET_SENDING",
            setError:"SET_ERROR"
        },
        contact: {
            addMessage: "ADD_MESSAGE",
            addHelpMessage: "ADD_HELP_MESSAGE",
            addSendingMessage: "ADD_SENDING_MESSAGE",
        },
        datetime: {
            addNewBookings: "ADD_NEW_BOOKINGS",
            addAllBookings: "ADD_ALL_BOOKINGS",
            setSending: "SET_SENDING"
        },
        reviews: {
            addReviews: "ADD_REVIEWS",
            changeShowNumber: "CHANGE_SHOW_NUMBER",
            setSending:"SET_SENDING"
        }
    }
}