

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(innerWidth, innerHeight);
cam.position.z = 200;

document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xAAAAAA, 1);

var directionalLight = new THREE.DirectionalLight({ color: 0xFFFFFF, intensity: 100 });
directionalLight.position.set(0,1,0);
directionalLight.castShadow = true;
scene.add(directionalLight);

var ambientLight = new THREE.AmbientLight(0xffffff,0.2);
scene.add(ambientLight);

// var pointLight = new THREE.PointLight(0xffffff, 1);
// cam.add(pointLight);


var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
scene.add(cube);

var textureBackup = new THREE.MeshLambertMaterial({ color: 0xff000 });



var mtlLoader = new THREE.MTLLoader();




var texture = new THREE.TextureLoader().load('model/bikefbx/textures/jawa11.png');
var greenTexture = new THREE.MeshLambertMaterial({ color: 0x00ff00 });



var loader = new THREE.FBXLoader();
loader.load('model/bikefbx/source/yawa.fbx', function (obj) {
     obj.position.y -= 80;
    scene.add(obj);

    // obj.traverse(function (child) {
    //     if (child instanceof THREE.Mesh) {
    //         child.material.map = greenTexture;
    //         child.material.needsUpdate = true;
    //         scene.add(child);
    //     }
    // });

}, undefined, function (e) {
    console.log(e);
});

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