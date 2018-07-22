import Symbol from 'es6-symbol';
import {SET_JWT, SET_SCREEN, SET_USER} from "../utils/types";

const INITIAL_STATE = {
    jwt: "",
    screen: "login",
    user: {}
};

const ACTIONS = {
    SET_JWT: Symbol(SET_JWT),
    SET_SCREEN: Symbol(SET_SCREEN),
    SET_USER: Symbol(SET_USER)
};

export function setJWT(jwt) {
    return {
        type: ACTIONS.SET_JWT,
        payload: jwt
    };
}

export function setScreen(scrn) {
    return {
        type: ACTIONS.SET_SCREEN,
        payload: scrn
    };
}

export function setUser(user) {
    return {
        type: ACTIONS.SET_USER,
        payload: user
    }
}

export default function reducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case ACTIONS.SET_JWT:
            return {
                ...state,
                jwt: action.payload
            };
        case ACTIONS.SET_SCREEN:
            return {
                ...state,
                screen: action.payload
            };
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return {...state};
    }
}
