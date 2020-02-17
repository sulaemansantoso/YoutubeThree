

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x111111, 1);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 200;

document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xAAAAAA, 1);

var directionalLight = new THREE.DirectionalLight({ color: 0xFFFFFF, intensity: 1 });

scene.add(directionalLight);

var ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
scene.add(ambientLight);

// var pointLight = new THREE.PointLight( 0xffffff, 100 );
// cam.add(pointLight);


var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
scene.add(cube);

var textureBackup = new THREE.MeshLambertMaterial({ color: 0xff000 });

var mtlLoader = new THREE.MTLLoader();

// mtlLoader.load('model/boy/BoyOBJ.mtl', function (materials) {
//     console.log(materials);
//     materials.preload();
    var loader = new THREE.OBJLoader();
    loader.load('model/zealot/Zealot.obj',
        function (obj) {
            // obj.traverse(function (node) {
            //     if (node.isMesh) {
            //         node.material = textureBackup;
            //         // node.material = materials;
            //         // scene.add(node);
            //     }
            // });
            obj.position.y -= 40;
            scene.add(obj);
        }
    );
// }, () => {
//     console.log("loading");
// }, (e) => {
//     console.log("error loading material");
// });




const clock = new THREE.Clock();

var controls = new THREE.OrbitControls(cam, renderer.domElement);
controls.update();


function drawScene() {
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, cam);
    requestAnimationFrame(drawScene);
}

drawScene();