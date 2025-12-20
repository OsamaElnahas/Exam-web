var fNameRegex = /^[A-Za-z]{2,30}$/;
var lNameRegex = /^[A-Za-z]{2,30}$/;
var emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.(com|net|org)$/;
var PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirm-password');

var fNameErrMsg = document.getElementById('fNameErrMsg')
var lNameErrMsg = document.getElementById('lNameErrMsg')
var emailErrMsg = document.getElementById('emailErrMsg')
var passwordErrMsg = document.getElementById('passwordErrMsg')
var confirmPasswordErrMsg = document.getElementById('confirmPasswordErrMsg')

var submitBtn = document.getElementById('submitBtn');

var registerForm = document.querySelector('form');



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


fName.addEventListener("blur", () => {
    validateField(fName, fNameRegex, fNameErrMsg, "First Name is required", "First Name must be letters and (2–30 chars)");
});

lName.addEventListener("blur", () => {
    validateField(lName, lNameRegex, lNameErrMsg, "Last Name is required", "Last Name must be letters and (2–30 chars)");
});
emailInput.addEventListener("blur", () => {
    validateField(emailInput, emailRegex, emailErrMsg, "Email is required", "Please enter a valid email address");
});
passwordInput.addEventListener("blur", () => {
    validateField(passwordInput, PasswordRegex, passwordErrMsg, "Password is required", "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
});

var isValidConfirmPassword = false;

confirmPasswordInput.addEventListener("blur", () => {
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



registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var isFnameValid = validateField(fName, fNameRegex, fNameErrMsg, "First Name is required", "First Name must be letters and (2–30 chars)");
    var isLnameValid = validateField(lName, lNameRegex, lNameErrMsg, "Last Name is required", "Last Name must be letters and (2–30 chars)");
    var isEmailValid = validateField(emailInput, emailRegex, emailErrMsg, "Email is required", "Please enter a valid email address");
    var isPasswordValid = validateField(passwordInput, PasswordRegex, passwordErrMsg, "Password is required", "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    if (isFnameValid && isLnameValid && isEmailValid && isPasswordValid && isValidConfirmPassword) {
        console.log("Form submitted successfully!");
        var userData = {
            firstName: fName.value,
            lastName: lName.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        submitBtn.textContent = "Submitting...";
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";
        setTimeout(function() {
            window.location.replace("../Login/login.html");
        }, 2000);
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
    }

});


if (localStorage.getItem('userData')) {
    window.location.replace("../Login/login.html");
}

// lName.addEventListener("change", () => {
//     validateField(lName, lNameRegex, lNameErrMsg, "Last Name is required", "Last Name must be letters and (2–30 chars)");
// });