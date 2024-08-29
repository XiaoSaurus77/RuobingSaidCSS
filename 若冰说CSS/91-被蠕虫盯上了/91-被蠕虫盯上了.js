function moveFunc(e) {
  let box = document.querySelector("#Eye_Group_L");
  let rightBox = document.querySelector("#Eye_Group_R");
  let boxBoundingRect = box.getBoundingClientRect();
  let boxCenter = {
    x: boxBoundingRect.left + boxBoundingRect.width / 2,
    y: boxBoundingRect.top + boxBoundingRect.height / 2
  };
  let angle =
    Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
    (180 / Math.PI);
  box.style.transform = `rotate(${angle + 60}deg)`;
  rightBox.style.transform = box.style.transform;
}

window.scrollTo({
  right: 0,
  top: document.body.scrollHeight,
  behavior: "smooth"
});
