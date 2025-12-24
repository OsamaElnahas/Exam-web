var toast = document.getElementById("toastCard");

console.log(JSON.parse(localStorage.getItem('userData')));

toast.textContent = `Welcome  ${JSON.parse(localStorage.getItem('userData')).firstName} !`;


var userNameDisplay = document.getElementById("userNameDisplay");

userNameDisplay.textContent = `${JSON.parse(localStorage.getItem('userData')).firstName} ${JSON.parse(localStorage.getItem('userData')).lastName}`;


setTimeout(() => {
    toast.classList.add("active");
}, 300);




setTimeout(() => {
    toast.classList.remove("active");
}, 3000);