//INIT THREEJS TUTORIAL


var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


cam.position.z = 25;
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



//adding resizing capability
window.addEventListener("resize", function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    cam.aspect = width / height;
    cam.updateProjectionMatrix();
});


let cubeGeo = new THREE.BoxGeometry(2,2,2);
let cubeMat1 = new THREE.MeshBasicMaterial({color:0xff000});
let cubeMat2 = new THREE.MeshBasicMaterial({color:0x00ff00});

let cube1 = new THREE.Mesh(cubeGeo, cubeMat1);
cube1.position.set(-10,0,0);
scene.add(cube1);

let cube2 = new THREE.Mesh(cubeGeo, cubeMat1);
cube2.position.set(10,0,0);
scene.add(cube2);

let clock = new THREE.Clock();
let controls = new THREE.FirstPersonControls(cam, renderer.domElement);
controls.lookSpeed =0.06;
controls.movementSpeed = 6;


let listener = new THREE.AudioListener();
cam.add(listener);

let sound1 = new THREE.PositionalAudio(listener);
let sound2 = new THREE.PositionalAudio(listener);


let audio1 = new THREE.AudioLoader().load('music/bensound-groovyhiphop.mp3', function(buffer) {
    sound1.setBuffer(buffer);
    sound1.setMaxDistance(3);
    sound1.setRefDistance(1);

});
let audio2 = new THREE.AudioLoader().load('music/bensound-happiness.mp3', function(buffer) {
    sound2.setBuffer(buffer);
    sound2.setMaxDistance(3);
    sound2.setRefDistance(1);

});

addEventListener('keydown', (evt) =>{
    if (evt.key == 'q'){
        if (!sound1.isPlaying) {
            sound1.play();
        }
        else {
            sound1.pause();
        }
    }
});


cube1.add(sound1);
cube2.add(sound2);

function update() {

    controls.update(clock.getDelta());

    requestAnimationFrame(update);
    renderer.render(scene, cam);
}

update();