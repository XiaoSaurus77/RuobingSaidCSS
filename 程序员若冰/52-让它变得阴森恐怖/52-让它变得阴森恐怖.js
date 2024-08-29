const textfield = document.getElementById("spookytext"),
	upperteeth = document.getElementById("upper"),
	lowerteeth = document.getElementById("lower"),
	pumpkin = document.getElementById("pumpkin"),
	body = document.body;
let textTotal = 0,
	finished = 0,
	newChar,
	letter,
	key,
	prevChars = [],
	newChars = [],
	charOffset;

textfield.addEventListener("keyup", compareChar);

function compareChar() {
	key = event.keyCode || event.charCode;
	newChars = textfield.value.split("");
	textTotal = newChars.length;
	charOffset = textTotal - prevChars.length;
	if (charOffset > 0) {
		for (i = charOffset; i > 0; i--) {
			let newChar = newChars.slice(i * -1)[0];
			if (newChar !== undefined && key !== 8) {
				letter = document.createElement("span");
				letter.textContent = newChar;
				letter.classList.add("char");
				letter.setAttribute("data-char", newChar);
				letter.style.setProperty("--char-index", textTotal);
				if (textTotal < 9) {
					upperteeth.appendChild(letter);
				} else if (textTotal < 18) {
					lowerteeth.appendChild(letter);
				}
			}
		}
	}
	if (textTotal < 9) {
		upperteeth.style.setProperty("--char-total", textTotal);
		body.style.setProperty("--char-total", textTotal);
	} else if (textTotal < 18) {
		lowerteeth.style.setProperty("--char-total", textTotal - 8);
		body.style.setProperty("--char-total", textTotal - 8);
	}
	if (textTotal > 0) {
		pumpkin.classList.add("open");
	} else {
		pumpkin.classList.remove("open");
		upperteeth.innerHTML = "";
		lowerteeth.innerHTML = "";
	}
	if (key == 8) {
		document.querySelectorAll(".char").forEach((char, i) => {
			if (i === textTotal) {
				char.remove();
			}
		});
	}
	prevChars = newChars;
}
