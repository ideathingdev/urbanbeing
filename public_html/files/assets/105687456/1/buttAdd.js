var ButtAdd = pc.createScript('buttAdd');
ButtAdd.attributes.add('add', { type: 'number', });
ButtAdd.attributes.add('addMobile', { type: 'number', });
// initialize code called once per entity
ButtAdd.prototype.initialize = function () {
    var self = this;
    this.entity.button.on('click', function (event) {
        if (mobile) {

            scrollValue = self.addMobile;
        } else {
            scrollValue = self.add;
        }

        if (self.add == 13 || self.addMobile == 13) {

        }
    }, this);
};

// update code called every frame
ButtAdd.prototype.update = function (dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// ButtAdd.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/