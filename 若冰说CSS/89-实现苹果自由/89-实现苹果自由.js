setTimeout(function () {
  document.getElementsByClassName("leafDiv")[0].style.animation =
    "leafAnim 3000ms ease-in-out infinite";
}, 500);

function makeApple(e) {
  console.log(e.target.className);
  if (e.target.className == "wrapper") {
    aChild = document.createElement("div");
    document.getElementsByClassName("wrapper")[0].appendChild(aChild);
    tempDiv = document.getElementsByTagName("div").length;
    R = Math.round(Math.random() * 4);
    leafR = Math.round(Math.random() * 4);
    colorR = Math.round(Math.random() * 4);
    document.getElementsByTagName("div")[tempDiv - 1].className =
      "appleDiv apple_" + R + " no_" + leafR;
    document.getElementsByTagName("div")[tempDiv - 1].style.top =
      e.clientY + "px";
    document.getElementsByTagName("div")[tempDiv - 1].style.left =
      e.clientX + "px";
    document.getElementsByTagName("div")[tempDiv - 1].innerHTML =
      '<div class="shadowDiv"></div><div class="leafDiv leaf_' +
      leafR +
      " leafColor_" +
      colorR +
      '"></div>';
    document.getElementsByTagName("p")[0].style.animationName = "destroyApple";
    document.getElementsByTagName("p")[0].style.animationFillMode = "forwards";
    setTimeout(function () {
      checkLeaf = document.getElementsByClassName("leafDiv").length;
      document.getElementsByClassName("leafDiv")[
        checkLeaf - 1
      ].style.animation =
        "leafAnim 3000ms ease-in-out infinite";
    }, 500);
  } else {
    console.log(e.target);
    e.target.style.animationName = "destroyApple";
    e.target.style.animationFillMode = "forwards";
    setTimeout(function () {
      e.target.parentNode.removeChild(e.target);
    }, 300);
  }
}
function switchAnim(e) {
  setTimeout(function () {
    alert(e.target);
  }, 400);
}
