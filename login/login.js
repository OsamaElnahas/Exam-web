var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");

var emailErrMsg = document.getElementById("emailErrMsg");
var passwordErrMsg = document.getElementById("passwordErrMsg");

var btnContent = document.getElementById("btn-content")
var loadingSpinner = document.getElementById("loading-spinner")




function validateLogin(email, password) {

    if (!email || !password) {
        emailErrMsg.textContent = "Email is required.";
        passwordErrMsg.textContent = "Password is required.";
        return false;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    for (var i = 0; i < users.length; i++) {
        if (
            users[i].email === email &&
            users[i].password === password
        ) {
            localStorage.setItem("currentUserId", users[i].id);
            emailErrMsg.textContent = "";
            passwordErrMsg.textContent = "";
            return true;
        }
    }

    passwordErrMsg.textContent = "Incorrect email or password.";
    return false;
}

loginBtn.addEventListener("click", function(e) {
    e.preventDefault();

    if (validateLogin(emailInput.value, passwordInput.value)) {


        btnContent.style.display = "none";
        loadingSpinner.style.display = "block";

        loginBtn.disabled = true;

        loginBtn.classList.add("disable");

        setTimeout(function() {
            window.location.replace("../start-exam/start.html");
        }, 2000);
    }
});