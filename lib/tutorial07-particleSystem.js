

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
cam.position.z = 10;
cam.position.y = 5;

document.body.appendChild(renderer.domElement);


var directionalLight = new THREE.DirectionalLight({ color: 0xFFFFFF, intensity: 100 });
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

let cubeMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
scene.add(cubeMesh);


let gr = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
gr.position.set(0, -0.5, 0);
scene.add(gr);

let particles = [];
let pSystem;


var texture = new THREE.TextureLoader().load("texture/flare_01_0.png");

let pCount = 2000,
    pGeo = new THREE.Geometry(),
    pMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 3,
        map: texture,
        sizeAttenuation : true,
        // transparent:true,
        alphaTest : 1
    


    });


for (var i = 0; i < pCount; i++) {
    let px = Math.random() * 100 - 50,
        py = Math.random() * 100 - 50,
        pz = Math.random() * 100 - 50,
        p = new THREE.Vector3(px, py, pz),
        v = new THREE.Vector3(
            Math.random() / 10,
            -   0.05,
            Math.random() / 10
        ),
        part = {
            position: p,
            velocity: v,
        };

    particles.push(part);
    pGeo.vertices.push(p);
}
pSystem = new THREE.Points(
    pGeo, pMat
);
scene.add(pSystem);







let clock = new THREE.Clock();



var controls = new THREE.OrbitControls(cam, renderer.domElement);
let angle = 0;
function drawScene() {
    angle += 0.09;
    if (pSystem) {

        particles.forEach(p => {
            if (p.position.y < -6) {
                let px = Math.random() * 100 - 100,
                    py = Math.random() * 100 - 100,
                    pz = Math.random() * 100 - 100;
                p.position.set(px, py, pz);
            }
            let velocity = new THREE.Vector3(
                Math.sin(angle / 180) * 0.1,
                -0.001,
                Math.sin(angle / 180) * 0.1,
            )
            p.position.x = p.position.x + Math.sin(angle) * 0.02;
            p.position.y -= 0.01;
        });
        pSystem.geometry.verticesNeedUpdate = true;
    }
    renderer.render(scene, cam);
    requestAnimationFrame(drawScene);
}

drawScene();