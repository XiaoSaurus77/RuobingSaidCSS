checkTransform = -15;
function flyFunc() {
  wiggleFunc();
  hh = Math.random() * (document.getElementById("borderDiv").offsetHeight - document.getElementById("borderDiv").offsetTop);
  ww = Math.random() * (document.getElementById("borderDiv").offsetWidth - document.getElementById("borderDiv").offsetLeft);
  //console.log(hh+" , "+ww);
  hh += document.getElementById("borderDiv").offsetTop;
  ww += document.getElementById("borderDiv").offsetLeft;
  //console.log(Math.atan2(hh - document.getElementById("butterWrapper").offsetTop, ww - document.getElementById("butterWrapper").offsetLeft))
  checkTransform = (Math.atan2(hh - document.getElementById("butterWrapper").offsetTop, ww - document.getElementById("butterWrapper").offsetLeft) * (180 / Math.PI));
  document.getElementById("butterWrapper").style.transform = "rotate(" + (checkTransform + 80) + "deg)";
  document.getElementById("butterWrapper").style.top = hh + "px";
  document.getElementById("butterWrapper").style.left = ww + "px";
  //console.log("H: "+document.getElementById("borderDiv").offsetHeight);
  //console.log("W: "+document.getElementById("borderDiv").offsetWidth);
  document.getElementById("butterWrapper").style.pointerEvents = "none";
  document.getElementsByClassName("shade")[0].style.animationName = "none";
  document.getElementsByClassName("shade")[0].style.animationPlayState = "running";
  var x = document.getElementsByClassName("wing");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.animationName = "none";
    x[i].style.animationPlayState = "running";
  }
  setTimeout(function () {
    document.getElementsByClassName("shade")[0].style.animationName = "shadeAnim";
    var x = document.getElementsByClassName("wing");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.animationName = "wingAnim";
    }
  }, 50);
  setTimeout(function () {
    clearTimeout(wiggleTime);
    document.getElementById("butterWrapper").style.pointerEvents = "all";
  }, 1500);
}
function wiggleFunc() {
  rl = Math.random() * 40;
  rt = Math.random() * 40;
  document.getElementById("innerWrapper").style.left = rl + "px";
  document.getElementById("innerWrapper").style.top = rt + "px";
  wiggleTime = setTimeout(function () {
    wiggleFunc();
  }, 200);
}