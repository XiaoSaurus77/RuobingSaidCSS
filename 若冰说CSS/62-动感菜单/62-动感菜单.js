let nav = document.querySelector('.nav')
let toggle = document.querySelector('.toggle')

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active')
  nav.classList.toggle('active')
})