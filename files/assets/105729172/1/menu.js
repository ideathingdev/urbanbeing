var Menu = pc.createScript('menu');
Menu.attributes.add('menu', { type: 'entity', });
Menu.attributes.add('close', { type: 'entity', });
// initialize code called once per entity
Menu.prototype.initialize = function () {
    var self = this;
    var menuPoso = new pc.Vec3(100, -30, 0)
    var menuPos = new pc.Vec3(100, -30, 0)
    var menuScale = new pc.Vec3(1, 1, 1)
    var open = false;

    self.menu.setLocalPosition(menuPos)

    self.tweenOpen = self.app.tween(menuPos)
        .to(new pc.Vec3(-40, -30, 0), 0.8, pc.QuinticOut)
        .on('update', (function () {
            self.menu.setLocalPosition(menuPos)
        })).on('complete', function () {
            open = true;

        });
    self.tweenClose = self.app.tween(menuPos)
        .to(menuPoso, 0.8, pc.QuinticOut)
        .on('update', (function () {
            self.menu.setLocalPosition(menuPos)
        })).on('complete', function () {

            self.tweenMenuButtOpen.start()
        });
    self.tweenMenuButtClose = self.app.tween(menuScale)
        .to(new pc.Vec3(0, 0, 0), 0.3, pc.QuinticOut)
        .on('update', (function () {
            self.entity.setLocalScale(menuScale)
        })).on('complete', function () {
            self.tweenOpen.start();

        });

    self.tweenMenuButtOpen = self.app.tween(menuScale)
        .to(new pc.Vec3(1, 1, 1), 0.3, pc.QuinticOut)
        .on('update', (function () {
            self.entity.setLocalScale(menuScale)
        })).on('complete', function () {
            open = false;

        });

    this.entity.button.on('click', function (event) {
        if (!open) {

            self.tweenMenuButtClose.start();

        }
    }, this);

    this.close.button.on('click', function (event) {
        if (open) {
            self.tweenClose.start();
        }
    }, this);


};


// update code called every frame
Menu.prototype.update = function (dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// Menu.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/