var Node = function (position) {
  this.geometry = new THREE.SphereGeometry(1, 20, 20);
  this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position = position;
  this.destination = Node.calcRandomPosition();
}

Node.calcRandomPosition = function () {
  return {
    x: Math.random() * 25, 
    y: Math.random() * 25, 
    z: Math.random() * 25
  }
}

Node.prototype.position = function () {
  return this.mesh.position;
};

Node.prototype.changeDestination = function () {
  this.destination = Node.calcRandomPosition();
};

Node.prototype.moveToDestination = function (increment) {
  var curPos = this.mesh.position;
  
  this.mesh.position.x += (this.destination.x - curPos.x) / 20;
  this.mesh.position.y += (this.destination.y - curPos.y) / 20;
  this.mesh.position.z += (this.destination.z - curPos.z) / 20;
};

Node.prototype._distanceToDestination = function () {
  var curPos = this.mesh.position;
  
  var distanceX = this.destination.x - curPos.x;
  var distanceY = this.destination.y - curPos.y;
  var distanceZ = this.destination.z - curPos.z;
  
  var squaredSum = Math.pow(distanceX, 2) + Math.pow(distanceY, 2) + Math.pow(distanceZ, 2);
  
  return Math.sqrt(squaredSum)
}