let renderer = new THREE.WebGLRenderer();
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(400, 400);

let scene01 = new THREE.Scene();
scene01.background = new THREE.Color(0x555500);
let scene02 = new THREE.Scene();
scene02.background = new THREE.Color(0x004444);

let cam1 = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
cam1.position.z += 5;

let cam2 = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
cam2.position.z += -5;
cam2.position.x += 5;


let container1 = document.querySelector("#container");
container1.appendChild(renderer.domElement);

let cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene01.add(cube);

let sphere = new THREE.Mesh( 
  new THREE.ConeGeometry(1,1,20,20),
  new THREE.MeshBasicMaterial({color : 0x00ffff})
);
scene02.add(sphere);

let controls = new THREE.OrbitControls(cam1, renderer.domElement);
let controls2 = new THREE.OrbitControls(cam2, renderer.domElement);

cam2.lookAt(cube.position.x, cube.position.y, cube.position.z);
cam2.setViewOffset(400,400,0,0,400,400);

function draw() {
  renderer.setViewport(0, 0, 200, 200);
  renderer.setScissor(0, 0, 200, 200);
  renderer.setScissorTest(true);
  renderer.render(scene01, cam1);


  sphere.rotation.x+=0.01;
  cube.rotation.z +=0.01;

  renderer.setViewport(200,200 , 200, 200);
  renderer.setScissor(200, 200, 200, 200);
  renderer.setScissorTest(true);
  renderer.render(scene02, cam2);
  

  requestAnimationFrame(draw);
}

draw();
