// ================= Toast =================
if (!localStorage.getItem("userData")) {
    window.location.replace("../Register/regeister.html")
}

// if (localStorage.getItem("submitted")) {
//         window.location.replace("../exam-results/index.html")
// }



var toast = document.getElementById("toastCard");
var userData = JSON.parse(localStorage.getItem("userData"));

toast.textContent = "Welcome " + userData.firstName + " !";

document.getElementById("userNameDisplay").textContent =
    userData.firstName + " " + userData.lastName;

setTimeout(function() {
    toast.classList.add("active");
}, 300);

setTimeout(function() {
    toast.classList.remove("active");
}, 3000);



var currentQuestionIndex = 0;


var questions = [{
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
        question: "Which JavaScript keyword is used to declare a constant?",
        correct_answer: "const",
        answers: [
            "var",
            "let",
            "const",
            "static"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        correct_answer: "<a>",
        answers: [
            "<link>",
            "<href>",
            "<a>",
            "<nav>"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        correct_answer: "push()",
        answers: [
            "add()",
            "insert()",
            "push()",
            "append()"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        correct_answer: "push()",
        answers: [
            "add()",
            "insert()",
            "push()",
            "append()"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        correct_answer: "push()",
        answers: [
            "add()",
            "insert()",
            "push()",
            "append()"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        correct_answer: "push()",
        answers: [
            "add()",
            "insert()",
            "push()",
            "append()"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        correct_answer: "push()",
        answers: [
            "add()",
            "insert()",
            "push()",
            "append()"
        ],
        choosen_answer: "",
        marked: false
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        correct_answer: "push()",
        answers: [
            "add()",
            "insert()",
            "push()",
            "append()"
        ],
        choosen_answer: "",
        marked: false
    }
];

var savedQuestions = localStorage.getItem("questions");

if (savedQuestions) {
    questions = JSON.parse(savedQuestions);
}


var questionText = document.getElementById("question-text");
var optionCards = document.querySelectorAll(".option-card");
var questionOptionsContainer = document.getElementById("questions-options-container")
var questionCounter = document.getElementById("question-counter")

var hours = 0;
var minutes = 0;
var seconds = 40;

localStorage.removeItem("remainingSeconds")
var totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
var remainingSeconds = localStorage.getItem("remainingSeconds") ?
    parseInt(localStorage.getItem("remainingSeconds")) :
    totalSeconds;


var timer = document.getElementById("timer");
var timerBar = document.getElementById("timer-barr");
var timerIcon = document.getElementById("timerIcon")

function format(num) {
    return num < 10 ? "0" + num : num;
}

const timeUpModal = document.getElementById("timeup-modal");

function showTimeUpModal() {
    timeUpModal.classList.remove("hidden");

    setTimeout(() => {
        timeUpModal.querySelector("div")
            .classList.add("show-modal");
    }, 50);

    document.body.style.overflow = "hidden";
}
document.getElementById("view-results-btn").onclick = function() {


    goResults()

};



function showTimer() {
    var h = Math.floor(remainingSeconds / 3600);
    var m = Math.floor((remainingSeconds % 3600) / 60);
    var s = remainingSeconds % 60;

    timer.textContent =
        format(h) + " : " + format(m) + " : " + format(s);

    var elapsed = totalSeconds - remainingSeconds;

    var percent = (elapsed / totalSeconds) * 100;
    timerBar.style.width = percent + "%";

    if (percent >= 75) {
        timerBar.classList.add("bg-red-500");
        if (percent >= 90) {
            timerIcon.classList.add("timer-warning")
            timerIcon.classList.add("scaling")
        }

    } else if (percent >= 50) {
        timerBar.classList.add("bg-yellow-400");
    }

}

var timerInterval = setInterval(function() {
    if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timer.textContent = "Time Over";
        timerBar.style.width = "100%";
        showTimeUpModal()
        submitExam();
        return;
    }

    remainingSeconds--;
    // localStorage.setItem("remainingSeconds", remainingSeconds);


    showTimer();
}, 1000);

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

    optionCards.forEach((card, index) => {
        card.classList.remove("selected");
        card.querySelector("p").textContent = q.answers[index];

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
    questions[currentQuestionIndex].choosen_answer = answer;
    localStorage.setItem("questions", JSON.stringify(questions));


    updateProgress();
}
optionCards.forEach((card, index) => {
    card.addEventListener("click", function(e) {
        const answer = questions[currentQuestionIndex].answers[index];
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


const markBtn = document.getElementById("mark-review");
const markIcon = document.getElementById("mark-icon");

markBtn.addEventListener("click", function() {
    const q = questions[currentQuestionIndex];

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
    localStorage.setItem("score", score);

}


var submitBtn = document.getElementById("submit-exam");
var submitModal = document.getElementById("submitModal");
var modalBox = document.getElementById("modalBox");
var overlay = document.getElementById("modalOverlay");
var cancelBtn = document.getElementById("cancelSubmit");
var confirmBtn = document.getElementById("confirmSubmit");
const loader = document.getElementById("global-loader");

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

    setTimeout(() => {
        modalBox.classList.remove("scale-95", "opacity-0");
        modalBox.classList.add("scale-100", "opacity-100");
    }, 10);
}

function closeModal() {
    modalBox.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
        submitModal.classList.add("hidden");
        submitModal.classList.remove("flex");
    }, 200);
}

submitBtn.addEventListener("click", openModal);

cancelBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

document.getElementById("confirmSubmit").onclick = function() {
    closeModal();

    submitExam();
    goResults()

};

function submitExam() {
    clearInterval(timerInterval);
    calcScore()
    localStorage.removeItem("remainingSeconds");
    localStorage.setItem("submitted", true)

}

function goResults() {
    showLoader();
    setTimeout(() => {
        hideLoader();
        window.location.replace("../exam-results/index.html")
    }, 2000);
}



var questionGrid = document.getElementById('question-grid');
var questionGridMobile = document.getElementById('question-grid-mobile');

function renderQuestionNavigator() {
    questionGrid.innerHTML = "";

    questions.forEach((q, index) => {
        const btn = document.createElement("button");
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

        btn.addEventListener("click", () => {
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