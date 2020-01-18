

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(300, 300);
document.body.appendChild(renderer.domElement);


var pointLight = new THREE.PointLight({ color: 0x00ff00, intensity: 5, distance: 5 });
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(pointLight);

var cubeGeo = new THREE.BoxGeometry(1, 1, 1);
var cubeMesh = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(cubeGeo, cubeMesh);


scene.add(cube);

console.log(cube);

cam.position.z = 5;

var angle = 0;

var quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

var trans = new THREE.Matrix4().makeTranslation(0.01, 0, 0);
var world = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
world = new THREE.Matrix4().makeRotationX(3.01);

var angle = 0;
var tempArrayCM = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1];
cube.matrixAutoUpdate = false;

console.log(cube);
function draw() {
    requestAnimationFrame(draw);

    angle+=0.01;
    var rotateMatrix = new THREE.Matrix4().makeRotationY(angle);
    var translateMatrix = new THREE.Matrix4().makeTranslation(2,0,0);
    var resultMatrix = new THREE.Matrix4().multiplyMatrices(rotateMatrix,translateMatrix);
// var resultMatrix = new THREE.Matrix4().multiplyMatrices(translateMatrix, rotateMatrix);
    
    cube.matrix.fromArray(resultMatrix.toArray());

    renderer.render(scene, cam);

}
draw();