const lis = document.querySelectorAll('.nav li');
lis.forEach(li => {
    li.addEventListener('click', function () {
        lis.forEach(item => {
            item.classList.remove('active');
            this.classList.add('active')
        })
    })
})