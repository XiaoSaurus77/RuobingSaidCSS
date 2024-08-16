let backs = document.getElementsByClassName('back');
for (let i = 0; i < backs.length; i++) {
    let back = backs[i];
    let width = back.clientWidth / 25;
    let height = width;
    let count = 25 * parseInt(back.clientHeight / height);
    for (let j = 0; j < count; j++) {
        let span = document.createElement('span');
        span.style.width = width + 'px';
        span.style.height = width + 'px';
        span.style.transition = '0.2s linear ' + Math.random() / 2 + 's';
        back.appendChild(span);
    }
}