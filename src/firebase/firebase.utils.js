// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCSP9eNiAF1hPg6KidCzN3XNEjruJBMx0Y',
    authDomain: 'crown-db-6b7d3.firebaseapp.com',
    projectId: 'crown-db-6b7d3',
    storageBucket: 'crown-db-6b7d3.appspot.com',
    messagingSenderId: '1014776302067',
    appId: '1:1014776302067:web:0dbfc684098749113e6a86',
    measurementId: 'G-3B60CDE19C'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (e) {
            console.log('error creating user', e.message);
        }
    }

    return userRef;
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;