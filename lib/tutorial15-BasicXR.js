
import {VRButton} from './../node_modules/three/examples/jsm/webxr/VRButton.js';

function init() {
  let scene = new THREE.Scene();
  let cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  let renderer = new THREE.WebGLRenderer();
  scene.background = new THREE.Color(0x5a5a5a);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.vr.enabled = true;

  let camGroup = new THREE.Group();
  camGroup.add(cam);
  camGroup.position.set(0,1.6,5);
  scene.add(camGroup);
  
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(VRButton.createButton(renderer));

  let cubeMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xf0f000 })
  );
  cubeMesh.position.set(0,1.6,0);
  scene.add(cubeMesh);

  let cubeMesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x00f000 })
  );
  cubeMesh2.position.set(0,2,0);
  scene.add(cubeMesh2);
 
  let kendali = renderer.vr.getController(0);
  
  kendali.addEventListener('selectstart',()=>{
    cubeMesh2.material.color.set(0x000000);
  });
  kendali.addEventListener('selectend',()=>{
    cubeMesh2.material.color.set(0x00f000);
  });
  

  renderer.setAnimationLoop(()=>{
    cubeMesh2.position.copy(kendali.position);
    cubeMesh2.quaternion.copy(kendali.quaternion);
    renderer.render(scene, cam);
  });
}

init();
