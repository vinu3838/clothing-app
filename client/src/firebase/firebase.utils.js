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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
const collectionRef = firestore.collection(collectionKey);
const batch = firestore.batch();
objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
});

return await batch.commit();
}

export const convertCollectionsSnapshotToMap= (collections)=> {
    const transformedCollection = collections.docs.map(doc=>{
        const {title, items}= doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumalator, collection)=> {
        accumalator[collection.title.toLowerCase()] = collection;
        return accumalator;
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject)=>{
        const unsubcribe = auth.onAuthStateChanged(userAuth=>{
            unsubcribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ promp: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;