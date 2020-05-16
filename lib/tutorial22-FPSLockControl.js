//INIT
var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.background = new THREE.Color(0x111111);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
cam.position.z = 5;
cam.position.y = 0;
var hemi = new THREE.HemisphereLight(0xffffff, 0xff00ff, 0.52);
scene.add(hemi);
var light = new THREE.PointLight({ color: "white" });
light.position.y = 5;
scene.add(light);
var light2 = new THREE.PointLight({ color: "yellow" });
light2.position.y = -5;
light2.position.x = 15;
scene.add(light2);
//adding resizing capability
window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
});

let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -0.5;
scene.add(grid);

let cubeGeo = new THREE.BoxGeometry(1, 1, 2);
let clock = new THREE.Clock();
let controls = new THREE.PointerLockControls(cam, renderer.domElement);

let btn1 = document.querySelector("#button1");

btn1.addEventListener("click", () => {
  controls.lock();
});
controls.addEventListener("unlock", function () {
  btn1.innerHTML = "unlocked";
});
controls.addEventListener("lock", function () {
  btn1.innerHTML = "locked";
});

let keyboard = [];
addEventListener("keydown", (k) => {
  keyboard[k.key] = true;
});
addEventListener("keyup", (k) => {
  keyboard[k.key] = false;
});
let move;

function process_keyboard(delta) {
  let speed = 5;
  let velocity = speed * delta;
  if (keyboard["w"] == true) {
    controls.moveForward(velocity);
  }
  if (keyboard["s"] == true) {
    controls.moveForward(-velocity);
  }
  if (keyboard["a"] == true) {
    controls.moveRight(-velocity);
  }
  if (keyboard["d"] == true) {
    controls.moveRight(velocity);
  }
}

let cubeMat1 = new THREE.MeshBasicMaterial({ color: 0x555500 });
let cube1 = new THREE.Mesh(cubeGeo, cubeMat1);
scene.add(cube1);


function update() {
  move = new THREE.Vector2(0, 0);
  let delta = clock.getDelta();
  process_keyboard(delta);
  requestAnimationFrame(update);
  renderer.render(scene, cam);
}
update();
