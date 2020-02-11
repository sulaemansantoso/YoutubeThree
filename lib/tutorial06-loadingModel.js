

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight,1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor (0x111111, 1);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 15;

document.body.appendChild(renderer.domElement);
renderer.setClearColor( 0xAAAAAA, 1 );

var directionalLight = new THREE.DirectionalLight({color: 0xFFFFFF, intensity:100});
scene.add(directionalLight);

var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshLambertMaterial({color:0xff0000})
);
scene.add(cube);

var loader = new THREE.FBXLoader();
loader.load('model/thunderbolt.FBX',
    function(result) {
        scene.add(result);
    }
);

const clock = new THREE.Clock();


function drawScene() {
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, cam);
    requestAnimationFrame(drawScene);
}

drawScene();