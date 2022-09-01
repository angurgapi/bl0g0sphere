import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export default ({ env, store }, inject) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCI0HIPIO4uq-TeJCrHzUvwmhn1wE79QPU',
    authDomain: 'bl0g0sphere.firebaseapp.com',
    projectId: 'bl0g0sphere',
    storageBucket: 'bl0g0sphere.appspot.com',
    messagingSenderId: '379524520641',
    appId: '1:379524520641:web:25ba3fc41515490c679240',
    measurementId: 'G-X5RY867PD3'
  }

  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

  inject('firebase', firebase)
}
