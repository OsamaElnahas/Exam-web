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