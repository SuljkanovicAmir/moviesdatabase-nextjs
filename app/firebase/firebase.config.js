
const config = {
  apiKey: "AIzaSyAumTozTEobjbTj71JKNATUi28nRMPNAMo",
  authDomain: "movieandtv-1c76f.firebaseapp.com",
  projectId: "movieandtv-1c76f",
  storageBucket: "movieandtv-1c76f.appspot.com",
  messagingSenderId: "833630000502",
  appId: "1:833630000502:web:26c093d2482db3a8bc5657",
  measurementId: "G-B8XE8Z2X02"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error(
        'No Firebase configuration object provided.' +
          '\n' +
          "Add your web app's configuration object to firebase-config.js",
      );
    } else {
      return config;
    }
  }