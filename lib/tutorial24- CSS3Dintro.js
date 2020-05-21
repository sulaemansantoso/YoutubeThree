let scene, cam, renderer;
let cssElement;


function init() {
  scene = new THREE.Scene();
  let aspect = window.innerWidth / window / innerHeight;
  cam = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);

  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.domElement.style.position = "absolute";
//   renderer.domElement.style.top = "0";

  cam.position.set(211, 0, 800);
  cam.lookAt(scene.position);

  var content =
    "<div>" +
    "<h1>This is an H1 Element.</h1>" +
    '<span class="large">Hello Three.js cookbook</span>' +
    "<textarea> And this is a textarea</textarea>" +
    "</div>";

 cssElement= createCSS3DObject(content);

  cssElement.position.set(0, 0, 0);
  scene.add(cssElement);

  document.body.appendChild(renderer.domElement);

  // let controls = new THREE.OrbitControls(cam, renderer.domElement);

  render();
}

function createCSS3DObject(s) {
  // convert the string to dome elements
  var wrapper = document.createElement("div");
  wrapper.innerHTML = s;
  // set some values on the div to style it, standard CSS
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  wrapper.style.opacity = 0.7;
  wrapper.style.background = new THREE.Color(
    Math.random() * 0xffffff
  ).getStyle();

  // create a CSS3Dobject and return it.
  var object = new THREE.CSS3DObject(wrapper);
  return object;
}

function render() {
  cssElement.rotation.y += 0.001;
  requestAnimationFrame(render);
  renderer.render(scene, cam);
}

init();
//   window.onload = init;