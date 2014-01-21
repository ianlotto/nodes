var scene = new THREE.Scene();
var BOUNDS = window.innerWidth;
var NODE_COUNT = 15;

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1500);

// camera.position.x = window.innderWidth / 2;
// camera.position.y = window.innderWidth / 2;
camera.position.z = window.innerWidth; 
camera.lookAt(new THREE.Vector3(0,0,-1));

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

var nodes = [];

for(var i = 0; i < NODE_COUNT; i++) {
  var position = Node.calcRandomPosition(BOUNDS);
  nodes.push(new Node(10, position, camera, BOUNDS));
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

function _lengthToHex (length) {
  var maxLength = window.innerWidth;
  var factor = 255 / maxLength;
  var hex = _toHex(Math.floor(length * factor));
  
  return parseInt("0x" + hex + hex + hex, 16);
}

function _toHex (n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 
 n = Math.max(0,Math.min(n,255));
 
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

render();