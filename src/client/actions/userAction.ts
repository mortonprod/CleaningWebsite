import actionNames from "./actionNames";

export function addName(name: string) {
    return {
        type: actionNames().addName,
        name
    }
}

export function addEmail(email: string) {
    return {
        type: actionNames().addEmail,
        email
    }
}