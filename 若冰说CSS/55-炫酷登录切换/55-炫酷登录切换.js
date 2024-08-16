const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
    container.classList.remove("panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("panel-active");
});