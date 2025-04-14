var Link = pc.createScript('link');
Link.attributes.add('url', { type: 'string' });
// initialize code called once per entity
Link.prototype.initialize = function () {
    var self = this;
    this.entity.button.on('click', function (event) {
        window.open(self.url);
    });
};

// update code called every frame
Link.prototype.update = function (dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// Link.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/