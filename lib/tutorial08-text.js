//INIT THREEJS TUTORIAL

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


cam.position.z = 45;
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

var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff00f0, wireframe: true }));
scene.add(box);

let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -0.5;
scene.add(grid);

let controls = new THREE.OrbitControls(cam, renderer.domElement);

let textPosition = new THREE.Vector3(-11, 0, 0);
let textTulisan = "Hello Word";

let group = new THREE.Group();
group.position.y = 1;

scene.add(group);
let selectedFont;
let textLoader = new THREE.FontLoader().load('fonts/GenghisKhan.json', (fontz) => {
    selectedFont = fontz;
    createText();
});
let Tulisan;

scene.fog = new THREE.Fog(0x000000, 15, 250);

function createText() {
    // let tGeo = new THREE.TextGeometry(textTulisan, {
    //     font: selectedFont,
    //     size: 5,
    //     height: 0.2,
    //     curveSegments: 3,

    // });
    let tGeo = new THREE.TextBufferGeometry(textTulisan, {
        font: selectedFont,
        size: 5,
        height: 1,
        curveSegments: 3,
    });

    let tMat = new THREE.MeshLambertMaterial({ color: 0xff0000, });
    Tulisan = new THREE.Mesh(tGeo, tMat);
    Tulisan.name = "myText";
    Tulisan.position.set(textPosition.x, textPosition.y, textPosition.z);

    group.add(Tulisan);


}
scene.add(group);

addEventListener('keydown', (e) => {
    event.preventDefault();

    if (e.keyCode == 8) {
        textTulisan = "";
    }
    else {
        textTulisan += e.key;
    }
    if (Tulisan) {
        group.remove(Tulisan);
        createText();
    }
});





//adding resizing capability
window.addEventListener("resize", function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    cam.aspect = width / height;
    cam.updateProjectionMatrix();
});

document.addEventListener('keydown', (e) => {
    if (e.key == "A") {
        Tulisan.tGeo.text
    }
});

function update() {
    requestAnimationFrame(update);
    box.rotation.x += 0.01;
    box.rotation.z += 0.01;
    renderer.render(scene, cam);
}

update();