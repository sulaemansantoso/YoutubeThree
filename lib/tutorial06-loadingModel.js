

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x111111, 1);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 415;

document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xAAAAAA, 1);

// var directionalLight = new THREE.DirectionalLight({ color: 0xFFFFFF, intensity: 1000 });

// scene.add(directionalLight);

// var ambientLight = new THREE.AmbientLight( 0xcccccc, 1000 );
// scene.add( ambientLight );

// var pointLight = new THREE.PointLight( 0xffffff, 100 );
// cam.add(pointLight);


var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
scene.add(cube);




var mtlLoader = new THREE.MTLLoader();

// var loader = new THREE.GLTFLoader()
//     .load('model/bikegltf/scene.gltf', function(gltf){
//         scene.add(gltf.scene);
//     }, undefined, 
//     function(e) {
//         console.log(e);
//     });

var loader = new THREE.FBXLoader();
loader.load('model/bikefbx/source/yawa.fbx', function(obj) {
   
   obj.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
            child.material.map = texture;
            child.material.needsUpdate = true;
        }
   });
}, undefined, function (e) {
    console.log(e);
});

// mtlLoader.load('model/Mark V.mtl', function (materials) {
//     materials.preload();
//     var loader = new THREE.OBJLoader();
//     loader.setMaterials(materials);
//     loader.load('model/Mark V.obj',
//         function (result) {
//             console.log(result);
//             scene.add(result);
//         }
//     );
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