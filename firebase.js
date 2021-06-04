import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDUu5Ob6xQylxmLmh1r1iAiVGfkxwgHFUY",
    authDomain: "whatsapp-cec10.firebaseapp.com",
    projectId: "whatsapp-cec10",
    storageBucket: "whatsapp-cec10.appspot.com",
    messagingSenderId: "940862213380",
    appId: "1:940862213380:web:f9c18515bcf6340a885451"
  };


  const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  export { db, auth, provider} ;

  