import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore/lite";
import {getStorage} from "firebase/storage";

/**
 * Firebase Config provee acceso a diferentes servicios
 * @returns {{app: FirebaseApp, storage: FirebaseStorage, db: Firestore}}
 * @constructor
 */
export const FirebaseConfig = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyDuTEWviUWDtVe8KT_VMWa4OCXCDdJmQl8",
        authDomain: "anf-2024.firebaseapp.com",
        projectId: "anf-2024",
        storageBucket: "anf-2024.firebasestorage.app",
        messagingSenderId: "917928049814",
        appId: "1:917928049814:web:4b7ba8a2e2a7e0164056b7"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);

    return {
        app,
        db,
        storage
    }

}