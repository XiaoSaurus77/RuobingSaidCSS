const body = document.body
const eye = document.querySelector('.eye')
const light = document.querySelector('.light')
const pass = document.querySelector('#pass')

body.addEventListener('mousemove', function (e) {
    let rect = light.getBoundingClientRect()
    let mouseX = rect.right + rect.width / 2
    let mouseY = rect.top + rect.height / 2
    let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY)
    let deg = (rad * (20 / Math.PI) * - 1) - 350
    body.style.setProperty('--deg', deg + 'deg')
})

eye.addEventListener('click', function (e) {
    e.preventDefault()
    body.classList.toggle('show-pass')
    const isPass = pass.type === 'password'
    pass.type = isPass ? 'text' : 'password'
    eye.className = 'eye iconfont ' + (isPass ? 'icon-see' : 'icon-nosee')
    pass.focus()
})