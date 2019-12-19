
//DAT GUI Tutorial 

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new function() {
    this.rotation = 0.02;
    this.lightposX = 0.02;
}
var gui = new dat.GUI();
gui.add(controls, "rotation",-0.3,0.3);
gui.add(controls, "lightposX",-15,15);

cam.position.z = 5;

var light = new THREE.PointLight(0xffffff,1,100);
light.position.y = 5;
light.position.x = -2;
scene.add(light);

var light2 = new THREE.DirectionalLight(0xff00ff, 0.5);
light2.position.y = -5;
light.position.z = 5;
light2.position.x = 15;
scene.add(light2);

texture = new THREE.TextureLoader().load("texture/rock_texture.jpg");

var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshPhongMaterial({  map:texture }));
box.position = new THREE.Vector3(1,1,1);
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
    box.rotation.x += controls.rotation;
    box.rotation.z += 0.01;
    light2.position.x = controls.lightposX;
    renderer.render(scene, cam);
}

update();