const toggleButton = document.querySelector(".toggle");

toggleButton.addEventListener("click", () => {
	const isPressed = JSON.parse(toggleButton.getAttribute("aria-pressed"));
	toggleButton.setAttribute("aria-pressed", !isPressed);
	document.body.classList.toggle("dark");
});
