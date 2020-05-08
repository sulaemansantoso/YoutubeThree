var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

cam.position.z = 15;

//adding resizing capability
window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
});

let rt2 = new THREE.WebGLRenderTarget(512, 512);
let rt2Scene = new THREE.Scene();
rt2Scene.background = new THREE.Color(0x00ff00);
var rtCam2 = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
rtCam2.position.set(0, 0, 5);
let sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 20, 20),
  new THREE.MeshBasicMaterial({ wireframe: true })
);
rt2Scene.add(sphere);

let rt = new THREE.WebGLRenderTarget(512, 512);
let rtScene = new THREE.Scene();
rtScene.background = new THREE.Color(0xff0000);
var rtCam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
rtCam.position.set(0, 0, 5);

let cubeGeo = new THREE.BoxGeometry(1, 1, 1);
let cubeMat1 = new THREE.MeshBasicMaterial({ color: 0x000000 });
let cube1 = new THREE.Mesh(cubeGeo, cubeMat1);
cube1.position.set(0, 0, 0);
rtScene.add(cube1);

var hemi = new THREE.HemisphereLight(0xffffff, 0xff00ff, 0.52);
rtScene.add(hemi);

var light = new THREE.PointLight({ color: "white" });
light.position.y = 5;
rtScene.add(light);

var light2 = new THREE.PointLight({ color: "yellow" });
light2.position.y = -5;
light2.position.x = 15;
rtScene.add(light2);

let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -0.5;
scene.add(grid);

let first = true;

let plane = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40, 10, 10),
  new THREE.MeshBasicMaterial({
    map: first ? rt.texture : rt2.texture,
    side: THREE.DoubleSide,
    color: 0xffffff,
  })
);
plane.rotation.set(0, 0, -Math.PI);
scene.add(plane);

scene.background = new THREE.Color(0x444444);
let controls = new THREE.OrbitControls(cam, renderer.domElement);

addEventListener("keydown", (evt) => {
  first = !first;
  plane.material.map = first ? rt.texture : rt2.texture;
  plane.material.needsUpdate = true;
});

function update() {
  requestAnimationFrame(update);
  cube1.rotation.x += 0.01;
  cube1.rotation.z += 0.01;

  if (first) {
    renderer.setRenderTarget(rt);
    renderer.render(rtScene, rtCam);
  } else {
    renderer.setRenderTarget(rt2);
    renderer.render(rt2Scene, rtCam2);
  }
  plane.rotation.y += 0.001;
  sphere.rotation.z += 0.01;

  renderer.setRenderTarget(null);
  renderer.render(scene, cam);
}

update();
