var Connection = function (start_node, end_node) {
  this.start_node = start_node;
  this.end_node = end_node;
  
  var startNodePos = start_node.position();
  var endNodePos = end_node.position();
  
  var vertices = [
    new THREE.Vector3(startNodePos.x, startNodePos.y, startNodePos.z), 
    new THREE.Vector3(endNodePos.x, endNodePos.y, endNodePos.z)
  ]
  
  this.geometry = new THREE.Geometry();
  this.geometry.verticesNeedUpdate = true;
  this.geometry.vertices = vertices;
 
  this.material = new THREE.LineBasicMaterial({ color: 0xff0000 });
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