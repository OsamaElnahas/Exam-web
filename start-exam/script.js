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


if (currentUser.exam.submitted) {
    window.location.replace("../exam-result/result.html");
}


if (!currentUser) {
    window.location.replace("../login/login.html");
}
var startBtn = document.querySelector("#start-exam");
var loadingSpinner = document.querySelector("#loading-spinner");
var btnContent = document.querySelector("#btn-content");

startBtn.addEventListener("click", function() {
    startBtn.disabled = true;
    startBtn.style.cursor = "not-allowed";

    btnContent.style.display = "none";
    loadingSpinner.style.display = "block";

    setTimeout(function() {
        window.location.replace("../exam-page/exam.html");
    }, 1500);
});