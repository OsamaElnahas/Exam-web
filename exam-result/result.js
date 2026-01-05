function saveCurrentUser() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === currentUser.id) {
            users[i] = currentUser;
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
}





var toast = document.getElementById("toastCard");

toast.textContent = "Exam Submitted Successfully!";

document.getElementById("userNameDisplay").textContent =
    currentUser.firstName + " " + currentUser.lastName;

setTimeout(function() {
    toast.classList.add("active");
}, 300);

setTimeout(function() {
    toast.classList.remove("active");
}, 3000);

var score = currentUser.exam.score;
var questions = currentUser.exam.questions;

var currentQuestionIndex = 0;

var questionText = document.getElementById("question-text");
var optionCards = document.querySelectorAll(".option-card");
var questionOptionsContainer = document.getElementById(
    "questions-options-container"
);
var questionCounter = document.getElementById("question-counter");

function showQuestion() {
    var q = questions[currentQuestionIndex];

    questionText.textContent = q.question;

    if (currentQuestionIndex == questions.length - 1) {
        document.getElementById("next-btn").classList.add("disable");
    } else {
        document.getElementById("next-btn").classList.remove("disable");
    }
    if (currentQuestionIndex == 0) {
        document.getElementById("prev-btn").classList.add("disable");
    } else {
        document.getElementById("prev-btn").classList.remove("disable");
    }

    optionCards.forEach(function(card, index) {
        card.classList.remove(
            "selected",
            "incorrect-answer-choose",
            "correct-answer-choose"
        );
        card.textContent = q.answers[index];

        var userAnswer = q.choosen_answer;
        var correctAnswer = q.correct_answer;
        var optionAnswer = q.answers[index];

        if (userAnswer === optionAnswer) {
            card.classList.add("selected");
            if (userAnswer === correctAnswer) {
                card.classList.add("correct-answer-choose");
            } else {
                card.classList.add("incorrect-answer-choose");
            }
        } else if (optionAnswer === correctAnswer) {
            card.classList.add("correct-answer-choose");
        }
    });
}

function updateCounter() {
    questionCounter.textContent =
        currentQuestionIndex + 1 + "/" + questions.length;
}
document.getElementById("next-btn").onclick = function() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
        animateQuestion("next");

        updateCounter();

        renderQuestionNavigator();

        renderQuestionNavigatorMobile();
    }
};

document.getElementById("prev-btn").onclick = function() {
    document.getElementById("next-btn").classList.remove("disable");

    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
        animateQuestion("prev");
        updateCounter();
        renderQuestionNavigator();
        renderQuestionNavigatorMobile();
    }
};

function animateQuestion(direction) {
    questionOptionsContainer.classList.remove("slide-left", "slide-right");

    void questionOptionsContainer.offsetWidth;

    if (direction === "next") {
        questionOptionsContainer.classList.add("slide-right");
    } else {
        questionOptionsContainer.classList.add("slide-left");
    }
}

function calcPercentage() {
    return Math.round((score / questions.length) * 100);
}

console.log(calcPercentage());

var percentageBar = document.getElementById("percentage-bar");
var percent = document.getElementById("percent");
percentageBar.style.setProperty("--value", calcPercentage());
percent.textContent = calcPercentage() + "%";

var resultMessage = document.getElementById("result-message");

var msgContainer = document.getElementById("msg-container");
var msgIcon = document.getElementById("msg-icon");

if (calcPercentage() >= 85) {
    percentageBar.classList.add("text-green-500");
    percent.classList.add("text-green-500");
    resultMessage.textContent = "Passed Excellent Performance";
    msgContainer.classList.add("bg-green-200", "text-green-800");
    msgIcon.classList.add("fa-regular", "fa-circle-check");
} else if (calcPercentage() >= 65 && calcPercentage() <= 84) {
    percentageBar.classList.add("text-yellow-500");
    percent.classList.add("text-yellow-500");
    resultMessage.textContent = "Passed very good Performance";
    msgContainer.classList.add("bg-yellow-200", "text-yellow-800");
    msgIcon.classList.add("fa-regular", "fa-circle-check");
} else {
    percentageBar.classList.add("text-red-600");
    percent.classList.add("text-red-600");
    resultMessage.textContent = "Failed";
    msgContainer.classList.add("bg-red-200", "text-red-800");
    msgIcon.classList.add("fa-regular", "fa-circle-xmark");
}

console.log("questionssss", questions);

var correct = 0;
var incorrect = 0;
var skipped = 0;
var total = questions.length;
var numOfCorrect = document.getElementById("nums-of-correct");
var numOfInCorrect = document.getElementById("nums-of-incorrect");
var numOfSkipped = document.getElementById("nums-of-skipped");
var numOfTotal = document.getElementById("nums-of-total");

for (var i = 0; i < questions.length; i++) {
    if (questions[i].choosen_answer === questions[i].correct_answer) {
        correct++;
    } else if (questions[i].choosen_answer !== "") {
        incorrect++;
    } else {
        skipped++;
    }
}
numOfCorrect.textContent = correct;
numOfInCorrect.textContent = incorrect;
numOfSkipped.textContent = skipped;
numOfTotal.textContent = total;

var questionGrid = document.getElementById("question-grid");
var questionGridMobile = document.getElementById("question-grid-mobile");

function renderQuestionNavigator() {
    questionGrid.innerHTML = "";

    questions.forEach((q, index) => {
        const btn = document.createElement("button");
        btn.textContent = index + 1;

        btn.className =
            "question-nav-btn w-full h-10 rounded font-semibold text-sm";

        if (index === currentQuestionIndex) {
            btn.classList.add("current");
        } else if (q.marked) {
            btn.classList.add("marked");
        } else if (q.choosen_answer !== "") {
            btn.classList.add("answered");
        } else {
            btn.classList.add("unanswered");
        }

        btn.addEventListener("click", () => {
            currentQuestionIndex = index;
            showQuestion();
            animateQuestion("next");
            updateCounter();
            renderQuestionNavigator();
        });

        questionGrid.appendChild(btn);
    });
}

function renderQuestionNavigatorMobile() {
    questionGridMobile.innerHTML = "";

    questions.forEach((q, index) => {
        const btn = document.createElement("button");
        btn.textContent = index + 1;

        btn.className =
            "question-nav-btn w-full h-10 rounded font-semibold text-sm";

        if (index === currentQuestionIndex) {
            btn.classList.add("current");
        } else if (q.marked) {
            btn.classList.add("marked");
        } else if (q.choosen_answer !== "") {
            btn.classList.add("answered");
        } else {
            btn.classList.add("unanswered");
        }

        btn.addEventListener("click", () => {
            currentQuestionIndex = index;
            showQuestion();
            animateQuestion("next");
            updateCounter();
            renderQuestionNavigatorMobile();
        });

        questionGridMobile.appendChild(btn);
    });
}
var logOutBtn = document.getElementById("logout-btn");
var loadingSpinner = document.querySelector("#loading-spinner");
var logoutIcon = document.getElementById("logout-icon");

logOutBtn.addEventListener("click", function() {
    logOutBtn.disabled = true;
    logOutBtn.style.cursor = "not-allowed";

    logoutIcon.style.display = "none";
    loadingSpinner.style.display = "block";

    localStorage.removeItem("currentUserId");

    setTimeout(function() {
        window.location.replace("../login/login.html");
    }, 1500);
});

showQuestion();
updateCounter();
renderQuestionNavigator();
renderQuestionNavigatorMobile();