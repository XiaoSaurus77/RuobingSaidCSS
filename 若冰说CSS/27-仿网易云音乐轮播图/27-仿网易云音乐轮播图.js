let current_index = -1;
let swipe_timer = null;
let links = [
    { 'image': './images/1.jpg', 'target': '#1' },
    { 'image': './images/2.jpg', 'target': '#2' },
    { 'image': './images/3.jpg', 'target': '#3' },
    { 'image': './images/4.jpg', 'target': '#4' },
    { 'image': './images/5.jpg', 'target': '#5' },
    { 'image': './images/6.jpg', 'target': '#6' }
];
let swipe = document.getElementById('swipe');
let swipe_bg = document.getElementById('swipe_bg');
let swipe_img_box = document.getElementById('swipe_img_box');
let swipe_link = document.getElementById('swipe_link');
let swipe_img = document.getElementById('swipe_img');
let swipe_select = document.getElementById('swipe_select');
let swipe_btn_left = document.getElementById('swipe_btn_left');
let swipe_btn_right = document.getElementById('swipe_btn_right');
let select = (index) => {
    stop();
    index = Number(index);
    if (index >= links.length) {
        return;
    }
    if (current_index == index) {
        return;
    }
    if (current_index > -1) {
        swipe_select.children[current_index].classList.remove('checked');
    }
    current_index = index;
    let current_link = links[current_index];
    swipe_bg.style.backgroundImage = 'url(' + current_link.image + ')';
    swipe_img.setAttribute('src', current_link.image);
    swipe_link.setAttribute('href', current_link.target);
    swipe_select.children[current_index].classList.add('checked');
};
let autoSelect = (index) => {
    index = Number(index);
    if (index >= links.length) {
        return;
    }
    if (current_index == index) {
        return;
    }
    swipe_select.children[current_index].classList.remove('checked');
    current_index = index;
    let current_link = links[current_index];
    swipe_img.style.transition = 'opacity 0.5s ease-in 0s';
    swipe_img.style.opacity = 0.2;
    setTimeout(() => {
        swipe_bg.style.backgroundImage = 'url(' + current_link.image + ')';
        swipe_img.setAttribute('src', current_link.image);
        swipe_link.setAttribute('href', current_link.target);
        swipe_img.style.transition = 'opacity 0.7s ease-out 0s';
        swipe_img.style.opacity = 1;
        if (!document.querySelector('.swipe .checked')) {
            swipe_select.children[current_index].style.transition = 'background-color 0.5s';
            swipe_select.children[current_index].classList.add('checked');
        }
    }, 500);
};
let play = () => {
    swipe_timer = setInterval(() => {
        let index = current_index + 1;
        if (index >= links.length) {
            index = 0;
        }
        autoSelect(index);
    }, 3000);
};
let stop = () => {
    if (swipe_timer) {
        clearInterval(swipe_timer);
        swipe_timer = null;
    }
};
let init = () => {
    for (let i = 0; i < links.length; i++) {
        let item = document.createElement('a');
        item.setAttribute('class', 'item');
        item.setAttribute('href', '#');
        item.setAttribute('data-index', i);
        swipe_select.appendChild(item);
    }
    select(0);
    bind();
    play();
};
let bind = () => {
    swipe_btn_left.addEventListener('click', () => {
        let index = current_index - 1;
        if (index < 0) {
            index = links.length - 1;
        }
        select(index);
    });
    swipe_btn_right.addEventListener('click', () => {
        let index = current_index + 1;
        if (index >= links.length) {
            index = 0;
        }
        select(index);
    });
    for (const key in swipe_select.children) {
        if (swipe_select.children.hasOwnProperty(key)) {
            const element = swipe_select.children[key];
            element.addEventListener('click', (e) => {
                e.preventDefault();
                select(e.target.dataset.index);
            });
        }
    }
    swipe.addEventListener('mouseover', (e) => {
        if (e.relatedTarget && swipe.compareDocumentPosition(e.relatedTarget) == 10) {
            stop();
        }
    });
    swipe.addEventListener('mouseout', (e) => {
        if (e.relatedTarget && swipe.compareDocumentPosition(e.relatedTarget) == 10) {
            play();
        }
    });
    swipe.addEventListener('mousemove', (e) => {
        stop();
    });
};
window.addEventListener('load', () => {
    init();
})