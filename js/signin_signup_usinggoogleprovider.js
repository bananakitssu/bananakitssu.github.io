import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-9m0QBFK0ikwFtnEvpadtEFjT6Ot-9AU",
	authDomain: "miney-crafty.firebaseapp.com",
	databaseURL: "https://miney-crafty-default-rtdb.firebaseio.com",
	storageBucket: "miney-crafty.appspot.com",
	messagingSenderId: "44265561515",
	appId: "1:44265561515:web:0c2bb71b490f9d826346ee",
	measurementId: "G-SS3YWF8M3X"
}

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);

document.querySelector("#GoogleSignUp_Login").addEventListener("click", (e) => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        console.log(user);
        console.log(token);

        document.querySelector("#LoginForm").setAttribute('hidden', '');
        document.querySelector("#SignUpForm").setAttribute('hidden', '');
        document.querySelector("#account").removeAttribute('hidden');
        document.querySelector("#account #account-Username").textContent = user.displayName;
        document.querySelector("#LoginButton").setAttribute('hidden', '');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.email;

        const credential = GoogleAuthProvider.credentialFromError(error);

        alert(errorMessage)
    })
})

document.querySelector("#Login_SignUpWithGoogleProvider").addEventListener("click", (e) => {e.preventDefault(); document.querySelector('#GoogleSignUp_Login').click()})