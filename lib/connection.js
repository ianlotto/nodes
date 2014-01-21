var Connection = function (start_node, end_node, length) {
  this.start_node = start_node;
  this.end_node = end_node;
  this._length = length; 
  
  var startNodePos = start_node.position();
  var endNodePos = end_node.position();
  
  var vertices = [
    new THREE.Vector3(startNodePos.x, startNodePos.y, startNodePos.z), 
    new THREE.Vector3(endNodePos.x, endNodePos.y, endNodePos.z)
  ]
  
  this.geometry = new THREE.Geometry();
  this.geometry.verticesNeedUpdate = true;
  this.geometry.vertices = vertices;
 
  this.material = new THREE.LineBasicMaterial({ color: _lengthToHex(this._length) });
  
  this.line = new THREE.Line(this.geometry, this.material); 
}

Connection.prototype.startPoint = function () {
  return this.geometry.vertices[0];
}

Connection.prototype.setStartPoint = function (vertex) {
  this.geometry.vertices[0].set(vertex.x, vertex.y, vertex.z);
}

Connection.prototype.endPoint = function () {
  return this.geometry.vertices[1];
}