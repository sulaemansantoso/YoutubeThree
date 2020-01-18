var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(300, 300);
document.body.appendChild(renderer.domElement);




var cubeGeo = new THREE.BoxGeometry(1, 1, 1);
var cubeMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(cubeGeo, cubeMesh);
scene.add(cube);

cam.position.z = 15;




var angle = 0;


var trans = new THREE.Matrix4().makeTranslation(0.01, 0, 0);

function draw() {
    requestAnimationFrame(draw);

    angle += 0.01;
    var world = new THREE.Matrix4().makeRotationX(0.01);


    cube.geometry.applyMatrix(world);
    renderer.render(scene, cam);



}
draw();