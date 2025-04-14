var MobilePos = pc.createScript('mobilePos');
MobilePos.attributes.add('pos', { type: 'vec3' });
MobilePos.attributes.add('scale', { type: 'vec3', default: [1, 1, 1] });
// initialize code called once per entity
MobilePos.prototype.initialize = function () {
    var self = this;
    var width = this.app.graphicsDevice.width;
    var height = this.app.graphicsDevice.height;

    //pc.platform.mobile && 
    if (width < height) {
        self.entity.setLocalPosition(self.pos);
        self.entity.setLocalScale(self.scale);
    }
};

// update code called every frame
MobilePos.prototype.update = function (dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// MobilePos.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/