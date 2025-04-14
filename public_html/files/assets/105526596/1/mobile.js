var Mobile = pc.createScript('mobile');
var mobile = false;
// initialize code called once per entity
Mobile.prototype.initialize = function () {

    var width = this.app.graphicsDevice.width;
    var height = this.app.graphicsDevice.height;

    //pc.platform.mobile && 
    if (pc.platform.mobile && width > height) {
        // touch is supported
        self.entity.setLocalScale(0.8, 0.8, 0.8);
        textScale = 1
        textPos = 1.3
        breakPos = 1.3
        mobile = true;
    } else if (width < height) {
        // touch is supported
        self.entity.setLocalScale(0.5, 0.5, 0.5);
        textScale = 1
        textPos = 2
        breakPos = 1.3
        mobile = true;

    }

};

// update code called every frame
Mobile.prototype.update = function (dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// Mobile.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/