//CUSTOM GEOMETRY TUTORIAL

var width = window.innerWidth;
var height = window.innerHeight;


var scene = new THREE.Scene();
var cam  = new THREE.PerspectiveCamera(45, width/height, 0.1,1000);
var renderer =  new THREE.WebGLRenderer();

renderer.setSize(width, height);


document.body.appendChild(renderer.domElement);
cam.position.z = 4;

var geo = new THREE.Geometry();
geo.vertices.push(
    new THREE.Vector3(-1,-1,0),
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(1,-1,0),
);

geo.faces.push(
    new THREE.Face3(0,2,1)
);
var triangle = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xff0000, side:THREE.DoubleSide}));
scene.add(triangle);

// var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color:0xff00ff}));
// scene.add(cube);

function update() {
  requestAnimationFrame(update);

  triangle.rotation.y += 0.01;
  renderer.render(scene, cam);
}
update();