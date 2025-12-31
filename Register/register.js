var fNameRegex = /^[A-Za-z]{2,30}$/;
var lNameRegex = /^[A-Za-z]{2,30}$/;
var emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.(com|net|org)$/;
var PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;

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
var btnContent = document.getElementById("btn-content")
var loadingSpinner = document.getElementById("loading-spinner")




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


fName.addEventListener("blur", function() {
    validateField(fName, fNameRegex, fNameErrMsg, "First Name is required", "First Name must be letters and (2–30 chars)");
});

lName.addEventListener("blur", function() {
    validateField(lName, lNameRegex, lNameErrMsg, "Last Name is required", "Last Name must be letters and (2–30 chars)");
});
emailInput.addEventListener("blur", function() {
    validateField(emailInput, emailRegex, emailErrMsg, "Email is required", "Please enter a valid email address");
});
passwordInput.addEventListener("blur", function() {
    validateField(passwordInput, PasswordRegex, passwordErrMsg, "Password is required", "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
});

var isValidConfirmPassword = false;

confirmPasswordInput.addEventListener("blur", function() {
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


        var users = JSON.parse(localStorage.getItem("users")) || [];

        for (var i = 0; i < users.length; i++) {
            if (users[i].email === emailInput.value) {
                emailErrMsg.textContent = "Email already exists";
                emailErrMsg.style.display = "block";
                return;
            }
        }
        var userData = {
            id: Date.now(),
            firstName: fName.value,
            lastName: lName.value,
            email: emailInput.value,
            password: passwordInput.value,
            exam: {
                questions: [],
                submitted: false,
                score: null,
                remainingSeconds: null
            }
        };




        users.push(userData);

        localStorage.setItem("users", JSON.stringify(users));

        console.log("Form submitted successfully!");

        btnContent.style.display = "none";
        loadingSpinner.style.display = "block";

        submitBtn.disabled = true;

        submitBtn.classList.add("disable");

        setTimeout(function() {
            window.location.replace("../login/login.html");
        }, 1500);



        console.log(userData);
    }

});