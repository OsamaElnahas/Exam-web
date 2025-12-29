console.log(JSON.parse(localStorage.getItem("userData")));

var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");
var emailErrMsg = document.getElementById("emailErrMsg");
var passwordErrMsg = document.getElementById("passwordErrMsg");

if (localStorage.getItem("isLoggedIn")) {
  window.location.replace("../start-exam/index.html");
}

function validateEmailPassword(email, password) {
  emailErrMsg.textContent = "";
  passwordErrMsg.textContent = "";

  if (!email || !password) {
    emailErrMsg.textContent = "Email is required.";
    passwordErrMsg.textContent = "Password is required.";
    return false;
  }

  var users = localStorage.getItem("users");
  if (users) {
    users = JSON.parse(users);
  } else {
    users = [];
  }

  var foundUser = null;

  users.forEach(function (user) {
    if (user.email === email && user.password === password) {
      foundUser = user;
    }
  });

  if (foundUser) {
    emailErrMsg.textContent = "";
    passwordErrMsg.textContent = "";

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    localStorage.setItem("isLoggedIn", "true");

    return true;
  } else {
    passwordErrMsg.textContent = "Incorrect email or password";
    return false;
  }
}

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (validateEmailPassword(emailInput.value, passwordInput.value)) {
    loginBtn.textContent = "Logging in...";
    loginBtn.disabled = true;
    loginBtn.style.cursor = "not-allowed";

    setTimeout(function () {
      window.location.replace("../start-exam/index.html");
    }, 1500);
  }
});
