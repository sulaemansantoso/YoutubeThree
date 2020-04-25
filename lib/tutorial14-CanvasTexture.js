//INIT THREEJS TUTORIAL


var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
scene.background = new THREE.Color(0x5a5a5a);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


cam.position.z = 5;
cam.position.y = 0;

let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -0.5;
scene.add(grid);


let controls = new THREE.OrbitControls(cam, renderer.domElement);



let cubeGeo = new THREE.BoxGeometry(2, 2, 2);
let texture = new THREE.Texture(_2DCanvas);
let material = new THREE.MeshBasicMaterial({ map: texture });
let cubeMesh = new THREE.Mesh(cubeGeo, material);
scene.add(cubeMesh);


function update() {
    texture.needsUpdate = true;

    requestAnimationFrame(update);
    renderer.render(scene, cam);
}

update();