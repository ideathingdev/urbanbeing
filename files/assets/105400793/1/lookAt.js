var lookAt = pc.createScript('lookAt');
lookAt.attributes.add('camera', { type: 'entity' });
// initialize code called once per entity

lookAt.prototype.initialize = function () {

};

// update code called every frame
lookAt.prototype.update = function (dt) {
  var position = this.camera.getPosition();
  position.add(new pc.Vec3(0, 50, 100));
  this.entity.lookAt(position);
  //  var dummyRot = this.entity.getLocalEulerAngles();
  // this.entity.setLocalEulerAngles(dummyRot.x, dummyRot.y, dummyRot.z);
  this.entity.rotateLocal(0, 180, 0);

  //this.entity.getLocalEulerAngles().z = 0;

};

