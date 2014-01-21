var scene = new THREE.Scene();
var BOUNDS = window.innerWidth / 2;
var NODE_COUNT = 10;

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .01, window.innerWidth * 2);

camera.position.z = window.innerWidth; 
camera.lookAt(new THREE.Vector3(1,0,0));

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

var nodes = [];

for(var i = 0; i < NODE_COUNT; i++) {
  var position = Node.calcRandomPosition(BOUNDS);
  nodes.push(new Node(10, position, BOUNDS));
}

nodes.forEach(function (node) {
  scene.add(node.mesh);
});

function moveNodes (nodes) {
  nodes.forEach(function (node) {
    
    node.moveToDestination();
    //node.moveConnections();
    
    //pick new destination just before node reaches intended destination
    if(node._distanceTo(node.destination) < 2) {
      node.changeDestination(BOUNDS);
    }
  });
};

function removeConnections(nodes) {
  nodes.forEach(function (node) {
    var connections = node.removeConnections();
    
    connections.forEach(function (connection) {
      scene.remove(connection.line);
    })
  });
}

function drawConnections (nodes) {
  nodes.forEach(function (node) {
    nodes.forEach(function (otherNode) {
      if(node !== otherNode) {
        var connection = node.addConnection(otherNode);
         //draw a line from node vertex to other node vertex
        if(connection) scene.add(connection.line);
      }
    });
  });
};

function render () {
  requestAnimationFrame(render);
  moveNodes(nodes);
  removeConnections(nodes);
  drawConnections(nodes);
  renderer.render(scene, camera);
  controls.update();
}

render();