//INIT THREEJS TUTORIAL


var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


cam.position.z = 5;
cam.position.y = 0;

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


let cubeGeo = new THREE.BoxGeometry(5, 5, 2);


let clock = new THREE.Clock();
let controls = new THREE.OrbitControls(cam, renderer.domElement);

var video = document.getElementById('video1');
let first = true;

addEventListener('keydown', (k) => {
    if (k.key = "q") {
        if (first == true) {
            video.src = "video/report.mp4";
            video.play();
            first = false;
        }
        else {
            console.log("enter here");
            first = true;
            video.src = "video/opening.webm";
             video.play();
        }
    }
});

var texture = new THREE.VideoTexture(video);

texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;

texture.format = THREE.RGBFormat;
let cubeMat1 = new THREE.MeshBasicMaterial({ map: texture });
let cubeMat2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

let cube1 = new THREE.Mesh(cubeGeo, cubeMat1);
scene.add(cube1);


function update() {

    requestAnimationFrame(update);
    renderer.render(scene, cam);
}

update();