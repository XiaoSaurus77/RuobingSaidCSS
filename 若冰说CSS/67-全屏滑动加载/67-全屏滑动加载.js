const value = document.querySelector('.value')
const range = document.querySelector('.range')
const mask = document.querySelector('.mask')
function move(e) {
    const num = e.target.value
    const hue = "hue-rotate(" + num + "deg)"
    value.textContent = num;
    value.style.filter = hue
    range.style.filter = hue
    mask.style.left = num + 'vw'
    mask.style.width = 100 - num + 'vw'
    mask.style.filter = hue
}
range.addEventListener('change', move)
range.addEventListener('mousemove', move)