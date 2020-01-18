

//CUSTOM GEOMETRY TUTORIAL

var width = window.innerWidth;
var height = window.innerHeight;


var scene = new THREE.Scene();
var cam  = new THREE.PerspectiveCamera(45, width/height, 0.1,1000);
var renderer =  new THREE.WebGLRenderer();

renderer.setSize(width, height);


document.body.appendChild(renderer.domElement);
cam.position.z = 10
cam.position.y = 2;
cam.lookAt(new THREE.Vector3(0,0,0));

var geo = new THREE.Geometry();
geo.vertices.push(
    new THREE.Vector3(-1,-1,0),
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(1,-1,0),
);

geo.faces.push(
    new THREE.Face3(0,2,1)
);
var triangle = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xff0000, side:THREE.DoubleSide}));
scene.add(triangle);

var cube = new THREE.Geometry();
cube.vertices.push(
  new THREE.Vector3(-1, 1, 1), // 0
  new THREE.Vector3( 1, 1, 1), // 1
  new THREE.Vector3( 1,-1, 1), // 2
  new THREE.Vector3(-1,-1, 1), // 3
  new THREE.Vector3(-1, 1, -1), // 4
  new THREE.Vector3( 1, 1, -1), // 5
  new THREE.Vector3( 1,-1, -1), // 6
  new THREE.Vector3(-1,-1, -1), // 7
);


//      4----=-----5
//    / |       /  |
// 0 --------1     . 
// |    |    |     |
// |    7----|-----6
// | /       |  /
// 3 ------- 2

cube.faces.push(

  //top
  new THREE.Face3(0,1,5),
  new THREE.Face3(5,4,0),
  
  //bottom
  new THREE.Face3(2,3,7),
  new THREE.Face3(7,6,2),

  //Front
  new THREE.Face3(2,1,0),
  new THREE.Face3(0,3,2),

  //back
  new THREE.Face3(7,4,5),
  new THREE.Face3(5,6,7),
  
  //sideA
  new THREE.Face3(3,0,4),
  new THREE.Face3(4,7,3),
  
  //side B
  new THREE.Face3(6,5,1),
  new THREE.Face3(1,2,6),

  
);

// color each faces
// cube.faces[0].color = cube.faces[1].color = new THREE.Color("red");
// cube.faces[2].color = cube.faces[3].color = new THREE.Color("yellow");
// cube.faces[4].color = cube.faces[5].color = new THREE.Color("blue");
// cube.faces[6].color = cube.faces[7].color = new THREE.Color("green");
// cube.faces[8].color = cube.faces[9].color = new THREE.Color("lime");
// cube.faces[10].color = cube.faces[11].color = new THREE.Color("magenta");

//color each vertex
cube.faces.forEach((face,idx) => {
  face.vertexColors = [
     (new THREE.Color()).setHSL(idx/12,1,0.5),
     (new THREE.Color()).setHSL(idx/12+0.1,1,0.5),
     (new THREE.Color()).setHSL(idx/12+0.2,1,0.5),
  ];
});

// var cubeMat = new THREE.MeshBasicMaterial({color:0xff0000});
// var cubeMat = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
var cubeMat = new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors});
var cubeMesh = new THREE.Mesh(cube, cubeMat);

cubeMesh.position.x = 3;
scene.add(cubeMesh);


// var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color:0xff00ff}));
// scene.add(cube);

function update() {
  requestAnimationFrame(update);

  triangle.rotation.y += 0.01;
  cubeMesh.rotation.y += 0.01;
  cubeMesh.rotation.x += 0.01;
  
  renderer.render(scene, cam);
}
update();