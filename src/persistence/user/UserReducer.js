import {UserConstants} from './UserConstants';

const initialState = {
    status: '',
    data: {
        loggedIn: false,
        firebaseLoggedIn: false,
        firebaseUser: {},
        user: {},
    },
    error: {},
};

export function UserReducer(state = initialState, action) {
    switch (action.type) {
        case UserConstants.SIGNIN_REQUEST:
            return {
                status: UserConstants.SIGNIN_REQUEST,
                data: {...state.data, ...{user: action.data}},
                error: {},
            };
        case UserConstants.SIGNIN_SUCCESS:
            return {
                status: UserConstants.SIGNIN_SUCCESS,
                data: {...state.data, ...{loggedIn: true, user: action.data}},
                error: {},
            };
        case UserConstants.SIGNIN_FAILURE:
            return {
                status: UserConstants.SIGNIN_FAILURE,
                data: {loggedIn: false, user: {}},
                error: action.data,
            };
        case UserConstants.FIREBASE_EMAIL_SIGNIN_REQUEST:
            return {
                status: UserConstants.FIREBASE_EMAIL_SIGNIN_REQUEST,
                data: {...state.data},
                error: {},
            };
        case UserConstants.FIREBASE_EMAIL_SIGNIN_SUCCESS:
            return {
                status: UserConstants.FIREBASE_EMAIL_SIGNIN_SUCCESS,
                data: {...state.data, ...{firebaseLoggedIn: true, firebaseUser: action.data}},
                error: {},
            };
        case UserConstants.FIREBASE_EMAIL_SIGNIN_FAILURE:
            return {
                status: UserConstants.FIREBASE_EMAIL_SIGNIN_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        case UserConstants.FIREBASE_FACEBOOK_SIGNIN_REQUEST:
            return {
                status: UserConstants.FIREBASE_FACEBOOK_SIGNIN_REQUEST,
                data: {...state.data},
                error: {},
            };
        case UserConstants.FIREBASE_FACEBOOK_SIGNIN_SUCCESS:
            return {
                status: UserConstants.FIREBASE_FACEBOOK_SIGNIN_SUCCESS,
                data: {...state.data, ...{firebaseLoggedIn: true, firebaseUser: action.data}},
                error: {},
            };
        case UserConstants.FIREBASE_FACEBOOK_SIGNIN_FAILURE:
            return {
                status: UserConstants.FIREBASE_FACEBOOK_SIGNIN_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        case UserConstants.FIREBASE_GOOGLE_SIGNIN_REQUEST:
            return {
                status: UserConstants.FIREBASE_GOOGLE_SIGNIN_REQUEST,
                data: {...state.data},
                error: {},
            };
        case UserConstants.FIREBASE_GOOGLE_SIGNIN_SUCCESS:
            return {
                status: UserConstants.FIREBASE_GOOGLE_SIGNIN_SUCCESS,
                data: {...state.data, ...{firebaseLoggedIn: true, firebaseUser: action.data}},
                error: {},
            };
        case UserConstants.FIREBASE_GOOGLE_SIGNIN_FAILURE:
            return {
                status: UserConstants.FIREBASE_GOOGLE_SIGNIN_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        case UserConstants.FIREBASE_SMS_SIGNIN_REQUEST:
            return {
                status: UserConstants.FIREBASE_SMS_SIGNIN_REQUEST,
                data: {...state.data},
                error: {},
            };
        case UserConstants.FIREBASE_SMS_SIGNIN_SUCCESS:
            return {
                status: UserConstants.FIREBASE_SMS_SIGNIN_SUCCESS,
                data: {...state.data, ...{firebaseLoggedIn: true, firebaseUser: action.data}},
                error: {},
            };
        case UserConstants.FIREBASE_SMS_SIGNIN_FAILURE:
            return {
                status: UserConstants.FIREBASE_SMS_SIGNIN_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        case UserConstants.SIGNUP_REQUEST:
            return {
                status: UserConstants.SIGNUP_REQUEST,
                data: {...state.data}, ...{loggedIn: false, user: {}},
                error: {},
            };
        case UserConstants.SIGNUP_SUCCESS:
            return {
                status: UserConstants.SIGNUP_SUCCESS,
                data: {...state.data, ...{loggedIn: true, user: action.data}},
                error: {},
            };
        case UserConstants.SIGNUP_FAILURE:
            return {
                status: UserConstants.SIGNUP_FAILURE,
                data: {
                    loggedIn: false,
                    firebaseLoggedIn: false,
                    firebaseUser: {},
                    user: {},
                },
                error: action.data,
            };
        case UserConstants.SIGNOUT_REQUEST:
            return {
                status: UserConstants.SIGNOUT_REQUEST,
                data: {...state.data},
                error: {},
            };
        case UserConstants.SIGNOUT_SUCCESS:
            return {
                status: UserConstants.SIGNOUT_SUCCESS,
                data: {
                    loggedIn: false,
                    firebaseLoggedIn: false,
                    firebaseUser: {},
                    user: {},
                },
                error: {},
            };
        case UserConstants.SIGNOUT_FAILURE:
            return {
                status: UserConstants.SIGNOUT_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        default:
            return state;
    }
}
