window.addEventListener("DOMContentLoaded", () => {
	const c = new Clock28(".clock");
});

class Clock28 {
	activeClass = "clock__unit--active";
	pristineClass = "clock__unit--pristine";
	lastTime = null;

	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.makePristine();
		this.timeUpdate();
	}
	get timeAsObject() {
		const date = new Date();
		const h = Utils.digits(date.getHours());
		const m = Utils.digits(date.getMinutes());
		const s = Utils.digits(date.getSeconds());

		return { h, m, s };
	}
	get timeAsString() {
		const { h, m, s } = this.timeAsObject;

		return [h, m, s].join(":");
	}
	makePristine() {
		// clear animations
		const unitEls = Array.from(this.el?.querySelectorAll('[data-unit]'));
		for (let unitEl of unitEls) {
			unitEl.classList.add(this.pristineClass);
		}
	}
	removeAnimations() {
		// clear animations
		const unitEls = Array.from(this.el?.querySelectorAll('[data-unit]'));
		for (let unitEl of unitEls) {
			unitEl.classList.remove(this.activeClass, this.pristineClass);
		}
	}
	timeUpdate() {
		// update the `aria-label`
		this.el?.setAttribute("aria-label", this.timeAsString);
		// update the units
		const time = this.timeAsObject;
		for (let unit in time) {
			const unitEl = this.el?.querySelector(`[data-unit="${unit}"]`);
			const prev = Array.from(unitEl?.querySelectorAll("[data-prev]"));
			const next = Array.from(unitEl?.querySelectorAll("[data-next]"));

			for (let p of prev) {
				let prevDigits = +time[unit] - 1;
				if (prevDigits < 0) prevDigits += 60;

				p.innerText = Utils.digits(prevDigits);
			}
			for (let n of next) {
				n.innerText = time[unit];
			}
			// animate the flip
			if (+time[unit] !== +this.lastTime?.[unit]) {
				unitEl.classList.add(this.activeClass);
			}
		}
		this.lastTime = time;
		// loop
		clearTimeout(this.animationLoop);
		this.animationLoop = setTimeout(this.removeAnimations.bind(this), 500);
		clearTimeout(this.timeUpdateLoop);
		this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this), 1e3);
	}
}
class Utils {
	static digits(n) {
		if (n < 10) return `0${n}`;
		return `${n}`;
	}
}