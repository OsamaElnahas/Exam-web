var toast = document.getElementById("toastCard");

setTimeout(() => {

    toast.classList.add("active");

}, 300);


window.onload = function() {
    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);
}