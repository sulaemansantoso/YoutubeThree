let scene = new THREE.Scene();
let aspect = window.innerWidth / window.innerHeight;
let cam = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x555555);
cam.position.set(0, 0, 5);

let controls = new THREE.OrbitControls(cam, renderer.domElement);

// let grid = new THREE.GridHelper(60,20,0xfafafa,0xfafafa);
// scene.add(grid);

let shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.absellipse(0, 0, 2, 2, 0, 2 * Math.PI, false);
shape.autoClose = true;

let hole_shape = new THREE.Path();
hole_shape.moveTo(0, 0);
hole_shape.absellipse(0, 0, 0.5, 0.5, 0, Math.PI * 2, true);
shape.holes.push(hole_shape);

let shapeGeo = new THREE.ShapeGeometry(shape);
let shapeMat = new THREE.MeshBasicMaterial({ color: 0x33000 });
let shapeMesh = new THREE.Mesh(shapeGeo, shapeMat);
scene.add(shapeMesh);

let all_point = shape.extractPoints();
let point = all_point.shape.join(all_point.holes);

let geomPoint = new THREE.BufferGeometry().setFromPoints(all_point.shape);
let line = new THREE.Points(
  geomPoint,
  new THREE.PointsMaterial({
    color: 0xff0000,
    size: 0.2,
    side: THREE.DoubleSide,
  })
);
scene.add(line);
console.log(all_point);
let line2 = new THREE.Points(
  new THREE.BufferGeometry().setFromPoints(shape.holes[0].getPoints()),
  new THREE.PointsMaterial({
    color: 0xff0000,
    size: 0.2,
    side: THREE.DoubleSide,
  })
);
scene.add(line2);

function draw() {
  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}
draw();
