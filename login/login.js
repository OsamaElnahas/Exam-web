console.log(JSON.parse(localStorage.getItem('userData')));

var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var loginBtn = document.getElementById('loginBtn');
var emailErrMsg = document.getElementById('emailErrMsg');
var passwordErrMsg = document.getElementById('passwordErrMsg');

function validateEmailPassword(email, password) {
    if (!email || !password) {
        emailErrMsg.textContent = "Email is required.";
        passwordErrMsg.textContent = "Password is required.";
        return false;
    } else if (email !== JSON.parse(localStorage.getItem('userData')).email || password !== JSON.parse(localStorage.getItem('userData')).password) {
        passwordErrMsg.textContent = "Incorrect email or password.";
        return false;
    } else {

        emailErrMsg.textContent = "";
        passwordErrMsg.textContent = "";
        return true;
    }
}


loginBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (validateEmailPassword(emailInput.value, passwordInput.value)) {
        loginBtn.textContent = "Logging in...";
        localStorage.setItem('isLoggedIn', 'true');
        setTimeout(function() {
            window.location.replace("../exam-page/exam.html");
        }, 2000);

        loginBtn.disabled = true;
        loginBtn.style.cursor = "not-allowed";
    }

})
if (localStorage.getItem('isLoggedIn')) {
    window.location.replace("../exam-page/exam.html");
}