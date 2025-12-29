var fNameRegex = /^[A-Za-z]{2,30}$/;
var lNameRegex = /^[A-Za-z]{2,30}$/;
var emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.(com|net|org)$/;
var PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirm-password");

var fNameErrMsg = document.getElementById("fNameErrMsg");
var lNameErrMsg = document.getElementById("lNameErrMsg");
var emailErrMsg = document.getElementById("emailErrMsg");
var passwordErrMsg = document.getElementById("passwordErrMsg");
var confirmPasswordErrMsg = document.getElementById("confirmPasswordErrMsg");

var submitBtn = document.getElementById("submitBtn");

var registerForm = document.querySelector("form");

function validateField(input, regex, errorMsg, emptyMsg, invalidMsg) {
  if (input.value.trim() === "") {
    errorMsg.textContent = emptyMsg;
    errorMsg.style.display = "block";

    return false;
  } else if (!regex.test(input.value)) {
    errorMsg.textContent = invalidMsg;
    errorMsg.style.display = "block";
    return false;
  } else {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    return true;
  }
}

fName.addEventListener("blur", function () {
  validateField(
    fName,
    fNameRegex,
    fNameErrMsg,
    "First Name is required",
    "First Name must be letters and (2–30 chars)"
  );
});

lName.addEventListener("blur", function () {
  validateField(
    lName,
    lNameRegex,
    lNameErrMsg,
    "Last Name is required",
    "Last Name must be letters and (2–30 chars)"
  );
});
emailInput.addEventListener("blur", function () {
  validateField(
    emailInput,
    emailRegex,
    emailErrMsg,
    "Email is required",
    "Please enter a valid email address"
  );
});
passwordInput.addEventListener("blur", function () {
  validateField(
    passwordInput,
    PasswordRegex,
    passwordErrMsg,
    "Password is required",
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
  );
});

var isValidConfirmPassword = false;

confirmPasswordInput.addEventListener("blur", function () {
  if (confirmPasswordInput.value.trim() === "") {
    confirmPasswordErrMsg.textContent = "Confirm Password is required";
    confirmPasswordErrMsg.style.display = "block";
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordErrMsg.textContent = "Passwords do not match";
    confirmPasswordErrMsg.style.display = "block";
  } else {
    confirmPasswordErrMsg.textContent = "";
    confirmPasswordErrMsg.style.display = "none";
    isValidConfirmPassword = true;
  }
});

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var isFnameValid = validateField(
    fName,
    fNameRegex,
    fNameErrMsg,
    "First Name is required",
    "First Name must be letters and (2–30 chars)"
  );
  var isLnameValid = validateField(
    lName,
    lNameRegex,
    lNameErrMsg,
    "Last Name is required",
    "Last Name must be letters and (2–30 chars)"
  );
  var isEmailValid = validateField(
    emailInput,
    emailRegex,
    emailErrMsg,
    "Email is required",
    "Please enter a valid email address"
  );
  var isPasswordValid = validateField(
    passwordInput,
    PasswordRegex,
    passwordErrMsg,
    "Password is required",
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
  );
  if (
    isFnameValid &&
    isLnameValid &&
    isEmailValid &&
    isPasswordValid &&
    isValidConfirmPassword
  ) {
    var users = localStorage.getItem("users");
    if (users) {
      users = JSON.parse(users);
    } else {
      users = [];
    }

    //checking on previously registered emails
    var emailExists = false;

    users.forEach(function (user) {
      if (user.email === emailInput.value) {
        emailExists = true;
      }
    });

    if (emailExists) {
      emailErrMsg.textContent = "Email already registered";
      emailErrMsg.style.display = "block";
      return;
    }

    var userData = {
      firstName: fName.value,
      lastName: lName.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;
    submitBtn.style.cursor = "not-allowed";

    setTimeout(function () {
      window.location.replace("../Login/login.html");
    }, 1500);
  }
});
