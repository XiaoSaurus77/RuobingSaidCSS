let mouse = { x: 0, y: 0 };
let body = document.body;
let width = window.innerWidth/2;
let height = window.innerWidth/2;


body.addEventListener("mousemove", ({ clientX, clientY }) => {
    mouse.x = ((width - event.pageX) * -1) / width;
    mouse.y = ((height - event.pageY) * 1) / height;
    body.style.setProperty("--mouseX", mouse.x);
    body.style.setProperty("--mouseY", mouse.y);
  });


document.addEventListener('DOMContentLoaded', function () {
  body.querySelector('svg').classList.add('loaded');
}, false);