import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyByH9mF5lTGKHkN50j_avJB_dI4ZhmTkdM",
    authDomain: "kpi-dashboard-cfb4b.firebaseapp.com",
    projectId: "kpi-dashboard-cfb4b",
    storageBucket: "kpi-dashboard-cfb4b.appspot.com",
    messagingSenderId: "920487660009",
    appId: "1:920487660009:web:622a0b18e376d0c8046378",
    measurementId: "G-1PTMNMFQ04"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const loginContainer = document.querySelector('.loginContainer');
const login = document.querySelector(".login");
const email1 = document.getElementById("email1");
const password1 = document.getElementById("password1");
const submitBtn = document.getElementById("submitBtn");
const newAcct = document.getElementById("newAcct");
const signUpBtn = document.getElementById("signUpBtn");

const signUp = document.querySelector(".signUp");
const email2 = document.getElementById("email2");
const confirmEmail2 = document.getElementById("confirmEmail2");
const password2 = document.getElementById("password2");
const confirmPassword2 = document.getElementById("confirmPassword2");
const createAcctBtn = document.getElementById("createAcctBtn");
const returnBtn = document.getElementById("returnBtn");
const msg2 = document.getElementById("msg2");
const msg1 = document.getElementById("msg1");

let email, password, signUpEmail, signUpPassword, confirmSignUpEmail, confirmSignUpPassword;

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission
    email = email1.value;
    password = password1.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Success! Welcome back!");
            window.alert("Success! Welcome back!");
            window.location.href = 'dashboard.html'; // Redirect here
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error Code: ${errorCode}, Error Message: ${errorMessage}`);
            msg1.innerText = `${errorMessage}`;
            msg1.style.color = "red";
            msg1.style.backgroundColor = "white";
        });
});

createAcctBtn.addEventListener("click", () => {
    let Verified = true;
    signUpEmail = email2.value;
    signUpPassword = password2.value;
    confirmSignUpEmail = confirmEmail2.value;
    confirmSignUpPassword = confirmPassword2.value;

    if (signUpEmail != confirmSignUpEmail) {
        msg2.innerText = "Email fields do not match. Try again.";
        msg2.style.color = "red";
        msg2.style.backgroundColor = "white";
        Verified = false;
    }

    if (signUpPassword != confirmSignUpPassword) {
        msg2.innerText = "Password fields do not match. Try again.";
        msg2.style.color = "red";
        msg2.style.backgroundColor = "white";
        Verified = false;
    }

    if (!signUpEmail || !confirmSignUpEmail || !signUpPassword || !confirmSignUpPassword) {
        msg2.innerText = "Please fill out all required fields.";
        msg2.style.backgroundColor = "white";
        msg2.style.color = "red";
        Verified = false;
        return;
    }

    if (Verified) {
        createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                window.alert("Success! Account created.");
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    msg2.innerText = 'Invalid email address.';
                } else if (error.code === 'auth/email-already-in-use') {
                    msg2.innerText = 'Email is already in use.';
                } else if (error.code === 'auth/weak-password') {
                    msg2.innerText = 'Password should be at least 6 characters long.';
                } else {
                    msg2.innerText = 'An unknown error occurred. Please try again.';
                }
                msg2.style.color = 'red';
            });
    }
});

signUpBtn.addEventListener("click", () => {
    console.log("signing up");
    signUp.style.display = "block";
    login.style.display = "none";
});

returnBtn.addEventListener("click", () => {
    console.log("returning to login");
    signUp.style.display = "none";
    login.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
    signUp.style.display = "none";
    login.style.display = "block";
});
