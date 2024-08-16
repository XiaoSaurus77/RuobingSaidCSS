const r = new rive.Rive({
    src: "https://assets.codepen.io/278239/3306-6996-cannonball-man.riv",
    // OR the path to a discoverable and public Rive asset
    // src: '/public/example.riv',
    canvas: document.getElementById("canvas"),
    autoplay: true,
    stateMachines: "Motion",
    artboard: "Main Artboard",
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    }
  });
  