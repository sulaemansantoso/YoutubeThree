//INIT THREEJS TUTORIAL

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


cam.position.z = 5;
cam.position.y = 3;

var hemi = new THREE.HemisphereLight(0xffffff, 0xff00ff, 0.52);
scene.add(hemi);

var light = new THREE.PointLight({ color: "white" });
light.position.y = 5;
scene.add(light);

var light2 = new THREE.PointLight({ color: "yellow" });
light2.position.y = -5;
light2.position.x = 15;
scene.add(light2);


let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -0.5;
scene.add(grid);

let controls = new THREE.OrbitControls(cam, renderer.domElement);


let bGeo = new THREE.BoxGeometry(1, 1, 1);
let bMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00, 
    wireframe : true
});
let b1 = new THREE.Mesh(bGeo,bMat);
b1.position.set(-2,0,0);
let b2 = new THREE.Mesh(bGeo,bMat);
let b3 = new THREE.Mesh(bGeo,bMat);
b3.position.set(2,0,0);

let b4 = new THREE.Mesh(bGeo,bMat);
b4.position.set(0,2,0);

let sGeo = new THREE.SphereGeometry(0.5,10,10);
sGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0.5,0));
sGeo.merge(bGeo);
sGeo.mergeVertices();

let sMesh = new THREE.Mesh(sGeo, bMat);
sMesh.position.set(2,0,0);
scene.add(sMesh);




// let s1 = new THREE.Mesh(sGeo, bMat);
// s1.position.set(2,0.5,0);
// scene.add(s1);

// scene.add(b1);
// scene.add(b2);
// scene.add(b3);
// let g1 = new THREE.Group();
// g1.add(b3);
// g1.add(b1);
// scene.add(b2);
// scene.add(g1);

b1.add(b4);
scene.add(b1);
// scene.add(b3);


//adding resizing capability
window.addEventListener("resize", function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    cam.aspect = width / height;
    cam.updateProjectionMatrix();
});



function update() {
//    g1.rotation.y += 0.01;
    b1.rotation.x += 0.05;
    b4.rotation.y += 0.1;
    sMesh.rotation.z += 0.01;

    requestAnimationFrame(update);
    renderer.render(scene, cam);
}

update();