import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const auth = getAuth(app);

const submit = document.querySelector(".game #CreateAccountScreen .Next");

//import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

submit.addEventListener("click", function(event) {
    event.preventDefault();
    const emailInput = document.querySelector(".game #CreateAccountScreen .EmailInput").value;
const passwordInput = document.querySelector(".game #CreateAccountScreen .PasswordInput").value;
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
            //const db = getDatabase(app);

            document.querySelector("#LoginForm").setAttribute('hidden', '');
            document.querySelector("#SignUpForm").setAttribute('hidden', '');

            document.querySelector("#account #account-Username").textContent = user.email;

            document.querySelector("#LoginButton").setAttribute('hidden', '');

            document.querySelector("#account").removeAttribute('hidden');

            //set(ref(db, 'data/accounts/' + user.displayName),{
                //username: "Testing Player/User",
                //email: emailInput,
                //account_banned: false,
                //is_online: false,
                //is_inGame: null,
                //friends: []
            //}).then(()=>{
                //alert("Create Account Has Been Successfully !")
            //}).catch((error) => {
                //alert("Unseccessful");
                //console.log(error);
            //})
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        })
})

function DeleteData (user) {
    remove(ref(db, 'data/accounts/' + user.displayName), {
        username: "Testing Player/User",
        email: emailInput,
        account_banned: false,
        is_online: false,
        is_inGame: null,
        friends: []
    })
}

function GetUserData (user) {

}