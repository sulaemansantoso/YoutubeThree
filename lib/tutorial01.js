//INIT THREEJS TUTORIAL

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


cam.position.z = 5;

var light = new THREE.PointLight({color:"white"});
light.position.y = 5;
scene.add(light);

var light2 = new THREE.PointLight({color:"yellow"});
light2.position.y = -5;
light2.position.x = 15;
scene.add(light2);

var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({ color: 0xff00f0, wireframe:true }));
scene.add(box);

//adding resizing capability
window.addEventListener("resize",function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    cam.aspect = width/height;
    cam.updateProjectionMatrix();
});


function update() {
    requestAnimationFrame(update);
    box.rotation.x += 0.01;
    box.rotation.z += 0.01;
    renderer.render(scene, cam);
}

update();