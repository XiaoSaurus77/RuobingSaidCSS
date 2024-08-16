const sunBtn = document.querySelector('.sunBtn')
const moonBtn = document.querySelector('.moonBtn')

sunBtn.addEventListener('click', function () {
    document.getElementById('container').setAttribute('class', 'light');
})

moonBtn.addEventListener('click', function () {
    document.getElementById('container').setAttribute('class', 'dark');
})