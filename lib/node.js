var Node = function (size, position, bounds) {
  this.geometry = new THREE.SphereGeometry(size, 20, 20);
  this.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position = position;
  this.destination = Node.calcRandomPosition(bounds);
  
  this.connections = [];
}

Node.calcRandomPosition = function (bounds) {
  return {
    x: Math.random() * bounds, 
    y: Math.random() * bounds, 
    z: Math.random() * bounds
  }
};

Node.prototype.removeConnections = function () {
  var connections = this.connections;
  this.connections = [];
  
  return connections;
}

Node.prototype.addConnection = function (other_node) {
  if(this.hasConnection(other_node)) return false;
  
  var connection = new Connection(this, other_node, this._distanceTo(other_node.mesh.position));
  this.connections.push(connection);

  return connection;
};

Node.prototype.hasConnection = function (other_node) {
  var node = this;
  var connected = false
    
  other_node.connections.forEach(function (connection) {
    if(connection.end_node == node) {
      connected = true;
      return;
    }
  });
  
  return connected;
}

Node.prototype.position = function () {
  return this.mesh.position;
};

Node.prototype.changeDestination = function (bounds) {
  this.destination = Node.calcRandomPosition(bounds);
};

Node.prototype.moveToDestination = function (increment) {
  var curPos = this.mesh.position;
  
  this.mesh.position.x += (this.destination.x - curPos.x) / 20;
  this.mesh.position.y += (this.destination.y - curPos.y) / 20;
  this.mesh.position.z += (this.destination.z - curPos.z) / 20;
};

Node.prototype.moveConnections = function () {
  var node = this;
  this.connections.forEach(function (connection) {
    //console.log(connection.startPoint())
    connection.setStartPoint(node.mesh.position);
    //console.log("after: " + connection.startPoint())
  });
}

Node.prototype._distanceTo = function (point) {
  
  var curPos = this.mesh.position;
  
  var distanceX = point.x - curPos.x;
  var distanceY = point.y - curPos.y;
  var distanceZ = point.z - curPos.z;
  
  var squaredSum = Math.pow(distanceX, 2) + Math.pow(distanceY, 2) + Math.pow(distanceZ, 2);
  
  return Math.sqrt(squaredSum)
}