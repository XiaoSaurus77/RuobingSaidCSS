const stars = document.querySelector('.stars')
const moon = document.querySelector('.moon')
const behind = document.querySelector('.behind')
const front = document.querySelector('.front')
const txt = document.querySelector('.txt')
const btn = document.querySelector('.btn')
const header = document.querySelector('header')

window.addEventListener('scroll', function () {
    let value = window.scrollY
    stars.style.left = value * 0.25 + 'px'
    moon.style.top = value * 1.05 + 'px'
    behind.style.top = value * 0.5 + 'px'
    front.style.top = value * 0 + 'px'
    txt.style.marginRight = value * 4 + 'px'
    txt.style.marginTop = value * 1.5 + 'px'
    btn.style.marginTop = value * 1.5 + 'px'
    header.style.top = value * 0.5 + 'px'
})