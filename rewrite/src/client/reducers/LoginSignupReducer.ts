import { ADD_PERSON } from "../actions/LoginSignupAction.ts";
import "../polyFill/assignPolyFill.ts";
const initialState = {
    people: [{
        name: "",
        email: "",
        datesTime: [{}, {}]
    }]
}
export function customers(state = initialState, action) {
    switch (action.type) {
        case ADD_PERSON:
            return Object.assign({}, state, {
                people: [
                    ...state.people,
                    {
                        name: action.name,
                        email: action.email,
                        datesTime: action.datesTime
                    }
                ]
            })
        default:
            return state
    }
}
