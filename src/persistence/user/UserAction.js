import {RequestConstant, ResponseConstant} from "../common/CommonConstant";
import {UserConstants} from "./UserConstants";
import {UserService} from "./UserService";
import FirebaseService from "./FirebaseService";


export const UserAction = {
    signIn,
    signUp,
    signInWithEmail,
    signInWithFacebook,
    signInWithPhoneNumber,
    signInWithGoogle,
    signOut,
    updateProfile
};

function signIn(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.SIGNIN_REQUEST, data));
        const result = await UserService.signIn(url, data);
        dispatch(ResponseConstant(UserConstants.SIGNIN_SUCCESS, UserConstants.SIGNIN_FAILURE, result));
        return result;
    };
}

function signUp(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.SIGNUP_REQUEST, data));
        const result = await UserService.signUp(url, data);
        dispatch(ResponseConstant(UserConstants.SIGNUP_SUCCESS, UserConstants.SIGNUP_FAILURE, result));
        return result;
    };
}

function signInWithEmail(email,password) {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.FIREBASE_EMAIL_SIGNIN_REQUEST, {}));
        const result = await FirebaseService.signIn(email,password);
        dispatch(ResponseConstant(UserConstants.FIREBASE_EMAIL_SIGNIN_SUCCESS, UserConstants.FIREBASE_EMAIL_SIGNIN_FAILURE, result));
        return result;
    };
}
function signInWithFacebook() {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.FIREBASE_FACEBOOK_SIGNIN_REQUEST, {}));
        const result = await FirebaseService.signInWithFacebook();
        dispatch(ResponseConstant(UserConstants.FIREBASE_FACEBOOK_SIGNIN_SUCCESS, UserConstants.FIREBASE_FACEBOOK_SIGNIN_FAILURE, result));
        return result;
    };
}
function signInWithGoogle() {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.FIREBASE_GOOGLE_SIGNIN_REQUEST, {}));
        const result = await FirebaseService.signInWithGoogle();
        dispatch(ResponseConstant(UserConstants.FIREBASE_GOOGLE_SIGNIN_SUCCESS, UserConstants.FIREBASE_GOOGLE_SIGNIN_FAILURE, result));
        return result;
    };
}
function signInWithPhoneNumber(data) {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.FIREBASE_SMS_SIGNIN_REQUEST, {}));
        dispatch(ResponseConstant(UserConstants.FIREBASE_SMS_SIGNIN_SUCCESS, UserConstants.FIREBASE_SMS_SIGNIN_FAILURE, data));
        return data;
    };
}
function signOut() {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.SIGNOUT_REQUEST, {}));
        const result = {
            success :true,
            data : {}
        }
        await FirebaseService.logout();
        dispatch(ResponseConstant(UserConstants.SIGNOUT_SUCCESS, UserConstants.SIGNOUT_FAILURE, result));
    };
}
function updateProfile(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(UserConstants.SIGNIN_REQUEST, data));
        const result = await UserService.updateProfile(url, data);
        dispatch(ResponseConstant(UserConstants.SIGNIN_SUCCESS, UserConstants.SIGNIN_FAILURE, result));
        return result;
    };
}
