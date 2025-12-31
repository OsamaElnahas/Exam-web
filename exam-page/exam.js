if (!localStorage.getItem("currentUserId")) {
    window.location.replace("../login/login.html");
}



var users = JSON.parse(localStorage.getItem("users")) || [];
var currentUserId = Number(localStorage.getItem("currentUserId"));

var currentUser = null;


for (var i = 0; i < users.length; i++) {
    if (users[i].id === currentUserId) {
        currentUser = users[i];
        break;
    }
}

function saveCurrentUser() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === currentUser.id) {
            users[i] = currentUser;
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
}


if (currentUser.exam.submitted) {
    window.location.replace("../exam-result/result.html");
}


if (!currentUser) {
    window.location.replace("../login/login.html");
}

var questionsTemplate = [{
        question: "What does HTML stand for?",
        correct_answer: "HyperText Markup Language",
        answers: [
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "HyperText Transfer Protocol",
            "HyperText Markup Language"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which CSS property controls the text size?",
        correct_answer: "font-size",
        answers: [
            "text-style",
            "font-size",
            "text-size",
            "font-weight"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "What is the correct HTML tag for inserting an image?",
        correct_answer: "<img>",
        answers: [
            "<image>",
            "<img>",
            "<src>",
            "<picture>"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        correct_answer: "background-color",
        answers: [
            "color",
            "bgcolor",
            "background-color",
            "background"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "How do you create a hyperlink in HTML?",
        correct_answer: "<a>",
        answers: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which CSS property controls the text color?",
        correct_answer: "color",
        answers: [
            "text-color",
            "font-color",
            "color",
            "foreground-color"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "What does CSS stand for?",
        correct_answer: "Cascading Style Sheets",
        answers: [
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "In JavaScript, which method is used to write text to the HTML document?",
        correct_answer: "document.write()",
        answers: [
            "console.log()",
            "document.write()",
            "alert()",
            "print()"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "How do you select an element with id 'demo' in CSS?",
        correct_answer: "#demo",
        answers: [
            ".demo",
            "#demo",
            "demo",
            "*demo"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        correct_answer: "<ul>",
        answers: [
            "<ol>",
            "<ul>",
            "<li>",
            "<list>"
        ],
        choosen_answer: "",
        marked: false
    }
];

if (currentUser.exam.questions.length === 0) {
    currentUser.exam.questions =
        JSON.parse(JSON.stringify(questionsTemplate));
    saveCurrentUser()


}




var toast = document.getElementById("toastCard");

toast.textContent = "Welcome " + currentUser.firstName + " !";

document.getElementById("userNameDisplay").textContent =
    currentUser.firstName + " " + currentUser.lastName;

setTimeout(function() {
    toast.classList.add("active");
}, 300);

setTimeout(function() {
    toast.classList.remove("active");
}, 3000);

var questions = currentUser.exam.questions;


var currentQuestionIndex = 0;



var questionText = document.getElementById("question-text");
var optionCards = document.querySelectorAll(".option-card");
var questionOptionsContainer = document.getElementById("questions-options-container")
var questionCounter = document.getElementById("question-counter")

var hours = 0;
var minutes = 20;
var seconds = 60;

var totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

var remainingSeconds = localStorage.getItem("remainingSeconds") ?
    parseInt(localStorage.getItem("remainingSeconds")) :
    totalSeconds;


var timer = document.querySelectorAll(".timer");
var timerBar = document.querySelectorAll(".timer-bar");
var timerIcon = document.querySelectorAll(".timerIcon");

var timeUpModal = document.getElementById("timeup-modal");
var viewResultsBtn = document.getElementById("view-results-btn");




function format(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num;
}


function showTimeUpModal() {
    timeUpModal.classList.remove("hidden");

    setTimeout(function() {
        timeUpModal.querySelector("div")
            .classList.add("show-modal");
    }, 50);

    document.body.style.overflow = "hidden";
}

function showTimer() {
    var h = Math.floor(remainingSeconds / 3600);
    var m = Math.floor((remainingSeconds % 3600) / 60);
    var s = remainingSeconds % 60;

    // Update timer text
    for (var i = 0; i < timer.length; i++) {
        timer[i].textContent =
            format(h) + " : " + format(m) + " : " + format(s);
    }

    var elapsed = totalSeconds - remainingSeconds;
    var percent = (elapsed / totalSeconds) * 100;

    // Update progress bar
    for (var j = 0; j < timerBar.length; j++) {
        timerBar[j].style.width = percent + "%";

        if (percent >= 75) {
            timerBar[j].classList.add("bg-red-500");
        } else if (percent >= 50) {
            timerBar[j].classList.add("bg-yellow-400");
        }
    }

    if (percent >= 90) {
        for (var k = 0; k < timerIcon.length; k++) {
            timerIcon[k].classList.add("timer-warning");
            timerIcon[k].classList.add("scaling");
        }
    }
}

var timerInterval = setInterval(function() {

    if (remainingSeconds <= 0) {
        clearInterval(timerInterval);

        for (var i = 0; i < timer.length; i++) {
            timer[i].textContent = "Time Over";
        }

        for (var j = 0; j < timerBar.length; j++) {
            timerBar[j].style.width = "100%";
        }

        showTimeUpModal();
        submitExam();
        return;
    }

    remainingSeconds--;
    localStorage.setItem("remainingSeconds", remainingSeconds);

    showTimer();

}, 1000);

viewResultsBtn.onclick = function() {
    goResults();
};


showTimer();


function showQuestion() {
    var q = questions[currentQuestionIndex];

    questionText.textContent = q.question;

    if (currentQuestionIndex == questions.length - 1) {
        document.getElementById("next-btn").classList.add("disable")

    } else {
        document.getElementById("next-btn").classList.remove("disable")

    }
    if (currentQuestionIndex == 0) {
        document.getElementById("prev-btn").classList.add("disable")

    } else {
        document.getElementById("prev-btn").classList.remove("disable")


    }

    optionCards.forEach(function(card, index) {
        card.classList.remove("selected");

        card.textContent = q.answers[index];

        if (q.choosen_answer === q.answers[index]) {
            card.classList.add("selected");
        }
    });

    if (q.marked) {
        markIcon.setAttribute("fill", "currentColor");
    } else {
        markIcon.setAttribute("fill", "none");
    }

}


function selectAnswer(card, answer) {

    for (var i = 0; i < optionCards.length; i++) {
        optionCards[i].classList.remove("selected");
    }

    card.classList.add("selected");

    currentUser.exam.questions[currentQuestionIndex].choosen_answer = answer;

    saveCurrentUser()

    updateProgress();
}





optionCards.forEach(function(card, index) {
    card.addEventListener("click", function(e) {
        var answer = questions[currentQuestionIndex].answers[index];

        selectAnswer(e.currentTarget, answer);

    });
});


document.getElementById("next-btn").onclick = function() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
        animateQuestion("next");

        updateCounter();

        renderQuestionNavigator();

        renderQuestionNavigatorMobile()

    }

};

document.getElementById("prev-btn").onclick = function() {
    document.getElementById("next-btn").classList.remove("disable")

    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
        animateQuestion("prev");
        updateCounter();
        renderQuestionNavigator();
        renderQuestionNavigatorMobile()

    }
};


var markBtn = document.getElementById("mark-review");
var markIcon = document.getElementById("mark-icon");

markBtn.addEventListener("click", function() {
    var q = questions[currentQuestionIndex];

    q.marked = !q.marked;

    if (q.marked) {
        markIcon.setAttribute("fill", "currentColor");
    } else {
        markIcon.setAttribute("fill", "none");
    }
});



function animateQuestion(direction) {
    questionOptionsContainer.classList.remove("slide-left", "slide-right");

    void questionOptionsContainer.offsetWidth;

    if (direction === "next") {
        questionOptionsContainer.classList.add("slide-right");
    } else {
        questionOptionsContainer.classList.add("slide-left");
    }
}


function updateProgress() {
    var answered = 0;

    for (var i = 0; i < questions.length; i++) {
        if (questions[i].choosen_answer !== "") {
            answered++;
        }
    }

    var percent = Math.round((answered / questions.length) * 100);

    document.getElementById("progress-text").textContent =
        answered + "/" + questions.length;

    document.getElementById("progress-percent").textContent =
        percent + "%";

    document.getElementById("progress-bar").style.width =
        percent + "%";
}

function updateCounter() {
    questionCounter.textContent =
        currentQuestionIndex + 1 + "/" + questions.length;
}


var score = 0;

function calcScore() {
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].choosen_answer === questions[i].correct_answer) {
            score++;
        }
    }
}


var submitBtn = document.getElementById("submit-exam");
var submitModal = document.getElementById("submitModal");
var modalBox = document.getElementById("modalBox");
var overlay = document.getElementById("modalOverlay");
var cancelBtn = document.getElementById("cancelSubmit");
var confirmBtn = document.getElementById("confirmSubmit");
var loader = document.getElementById("global-loader");

function showLoader() {
    loader.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function hideLoader() {
    loader.classList.add("hidden");
    document.body.style.overflow = "";
}

function openModal() {
    submitModal.classList.remove("hidden");
    submitModal.classList.add("flex");

    setTimeout(function() {
        modalBox.classList.remove("scale-95", "opacity-0");
        modalBox.classList.add("scale-100", "opacity-100");
    }, 10);
}

function closeModal() {
    modalBox.classList.add("scale-95", "opacity-0");

    setTimeout(function() {
        submitModal.classList.add("hidden");
        submitModal.classList.remove("flex");
    }, 200);
}

submitBtn.addEventListener("click", openModal);

cancelBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

// document.addEventListener("keydown", function() {
//     if (e.key === "Escape") closeModal();
// });

document.getElementById("confirmSubmit").onclick = function() {
    closeModal();

    submitExam();
    goResults()

};



function submitExam() {
    clearInterval(timerInterval);
    calcScore();

    currentUser.exam.submitted = true;
    currentUser.exam.score = score;

    saveCurrentUser();

    localStorage.removeItem("remainingSeconds");
}


// localStorage.removeItem("submitted")

function goResults() {
    showLoader();
    setTimeout(function() {
        hideLoader();
        window.location.replace("../exam-result/result.html")
    }, 1500);
}



var questionGrid = document.getElementById('question-grid');
var questionGridMobile = document.getElementById('question-grid-mobile');

function renderQuestionNavigator() {
    questionGrid.innerHTML = "";

    questions.forEach(function(q, index) {
        var btn = document.createElement("button");
        btn.textContent = index + 1;

        btn.className =
            "question-nav-btn w-10 h-10 rounded font-semibold text-sm";

        if (index === currentQuestionIndex) {
            btn.classList.add("current");
        } else if (q.marked) {
            btn.classList.add("marked");
        } else if (q.choosen_answer !== "") {
            btn.classList.add("answered");
        } else {
            btn.classList.add("unanswered");
        }

        btn.addEventListener("click", function() {
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

    questions.forEach(function(q, index) {
        var btn = document.createElement("button");
        btn.textContent = index + 1;

        btn.className =
            "question-nav-btn w-10 h-10 rounded font-semibold text-sm";

        if (index === currentQuestionIndex) {
            btn.classList.add("current");
        } else if (q.marked) {
            btn.classList.add("marked");
        } else if (q.choosen_answer !== "") {
            btn.classList.add("answered");
        } else {
            btn.classList.add("unanswered");
        }

        btn.addEventListener("click", function() {
            currentQuestionIndex = index;
            showQuestion();
            animateQuestion("next");
            updateCounter();
            renderQuestionNavigatorMobile()
        });

        questionGridMobile.appendChild(btn);
    });
}

showQuestion();
updateProgress();
updateCounter();
renderQuestionNavigator();
renderQuestionNavigatorMobile();