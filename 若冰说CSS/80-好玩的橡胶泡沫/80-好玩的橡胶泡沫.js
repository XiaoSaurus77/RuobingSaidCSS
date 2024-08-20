const bubble = document.querySelector(".bubble");

bubble.addEventListener("click", function (evt) {
  evt.preventDefault();
  bubble.classList.add("animated");
  setTimeout(function () {
    bubble.classList.remove("animated");
  }, 1000);
});
