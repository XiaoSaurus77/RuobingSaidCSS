const bigbox = document.querySelector('.bigbox')
const imgs = document.querySelectorAll('img')
let canChange = true // 节流处理

imgs.forEach(img => {
    img.addEventListener('click', function () {
        if (canChange) {
            bigbox.style.backgroundImage = `url(${this.src})`
            imgs.forEach(item => item.classList.remove('active'))
            this.classList.add('active')

            canChange = false
            setTimeout(() => canChange = true, 1000)
        }
    })
})