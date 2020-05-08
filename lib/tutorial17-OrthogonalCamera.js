//INIT THREEJS TUTORIAL
var scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const orthoWidth = 5;
let cam = new THREE.OrthographicCamera(
  -orthoWidth * aspect,
  orthoWidth * aspect,
  orthoWidth,
  -orthoWidth,
  -100,
  30000
);
var renderer = new THREE.WebGLRenderer({ antialias: true });
scene.background = new THREE.Color(0x5a5a5a);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -1;
scene.add(grid);

let keyboard = [];
addEventListener("keydown", (evt) => {
  keyboard[evt.key] = true;
});

addEventListener("keyup", (evt) => {
  keyboard[evt.key] = false;
});

cam.position.set(3, 3, 5);

let curFrame = 1;

let coinTexture;
let loader = new THREE.TextureLoader().load("texture/coin_gold.png", (tex) => {
  coinTexture = tex;
  coinTexture.repeat.set(curFrame / 8, 1);
 
  coinTexture.needsUpdate = true;
  coinTexture.wrapS = THREE.RepeatWrapping;
  let coinMaterial = new THREE.SpriteMaterial({ map: coinTexture });
  let coinSprite = new THREE.Sprite(coinMaterial);
  coinSprite.scale.set(2, 2, 2);
  scene.add(coinSprite);
});
let controls= new THREE.OrbitControls(cam, renderer.domElement);

function processs_keyboard() {
  if (keyboard["w"] == true) {
    cam.position.y += 0.1;
    console.log("w");
  }
  if (keyboard["s"] == true) {
    cam.position.y -= 0.1;
  }
  if (keyboard["d"] == true) {
    cam.position.x += 0.1;
  }
  if (keyboard["a"] == true) {
    cam.position.x -= 0.1;
  }
  if (keyboard["z"] == true) {

  }

  cam.lookAt(0, 0, 0);
  cam.updateProjectionMatrix();
  cam.updateMatrix();
}

function animateSprite() {
  curFrame += 1;
  if (curFrame > 8) {
    curFrame = 1;
  }
  coinTexture.offset.x = (curFrame / 8);
}

let accu = 0;
let clock = new THREE.Clock();
function update() {
  processs_keyboard();
  if (coinTexture) {
    accu += clock.getDelta();
    if (accu > 0.1) {
      animateSprite();
      accu = 0;
    }
  }
  requestAnimationFrame(update);
  renderer.render(scene, cam);
}

update();
