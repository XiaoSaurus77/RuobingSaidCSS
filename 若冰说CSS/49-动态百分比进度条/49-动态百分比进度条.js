let percent = 20
const percentBox = document.querySelector('#percent')
const circle = document.querySelector('#circle')
const timer = setInterval(() => {
  percent += Math.ceil(Math.random() * 30)
  if (percent > 100) {
    percent = 100
    clearInterval(timer)
  }
  percentBox.innerHTML = percent
  circle.style.strokeDashoffset = `calc(440 - 440 * (${percent} / 100))`
}, 1500)