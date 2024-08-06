import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {ApplicationProperties} from '../../application.properties';

GoogleSignin.configure({
    webClientId: ApplicationProperties.webClientId,
});

const FirebaseService = {
    signIn,
    signInWithFacebook,
    signInWithGoogle,
    logout,

};

async function signIn(email, password) {
    try {
        return {
            success: true,
            data: await auth().signInWithEmailAndPassword(email, password),
        };
    } catch (e) {
        if (e.code === 'auth/user-not-found') {
            try {
                const newUser = await auth().createUserWithEmailAndPassword(email, password);
                return {
                    success: true,
                    data: newUser,
                };
            } catch (e) {
                console.log(e)
                return {
                    success: false,
                };
            }
        }
        console.log(e)
        return {
            success: false,
        };
    }
};

async function signInWithFacebook() {
    try {
        // Attempt login with permissions
        await LoginManager.logOut();
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        // Sign-in the user with the credential
        return {
            success: true,
            data: await auth().signInWithCredential(facebookCredential),
        };
    } catch (e) {
        return {
            success: false,
        };
    }
};

async function signInWithGoogle() {
    try {
        // Get the users ID token
        const {idToken} = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        return {
            success: true,
            data: auth().signInWithCredential(googleCredential)
        };
    } catch (e) {
        return {
            success: false,
        };
    }
};

async function logout() {
    try {
        await auth().signOut();
    } catch (e) {
        console.log(e)
        console.error(e);
    }
};
export default FirebaseService;
