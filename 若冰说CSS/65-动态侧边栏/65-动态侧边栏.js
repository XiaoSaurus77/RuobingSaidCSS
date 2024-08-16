let navigation = document.querySelector('.navigation')
let menuToggle = document.querySelector('.menuToggle')

menuToggle.addEventListener('click', function () {
    navigation.classList.toggle('active')
})

let list = document.querySelectorAll('.list')
function activeLink() {
    list.forEach(item => {
        item.classList.remove('active')
        this.classList.add('active')
    })
}

list.forEach(item => {
    item.addEventListener('click', activeLink)
})