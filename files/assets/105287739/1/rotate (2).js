var Rotate = pc.createScript('rotate');

Rotate.attributes.add('y', { type: 'entity' });
Rotate.attributes.add('orbitSensitivity', {
    type: 'number',
    default: 0.3,
    title: 'Orbit Sensitivity',
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

var silf;
// initialize code called once per entity
Rotate.prototype.initialize = function () {
    silf = this;
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);

    this.lastTouchPoint = new pc.Vec2();
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
    }

    this.on('destroy', function () {
        this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);

        if (this.app.touch) {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        }
    }, this);


    silf.angleY = 0;
    silf.angleX = 0;
    silf.preAngleY = 0
    silf.preAngleX = 0
    silf.postAngleY = 0
    silf.postAngleX = 0
};


Rotate.prototype.rotate = function (dx, dy) {
    var silf = this;
    silf.preAngleY = dx * 1
    silf.preAngleX = dy * 1
    console.log(" rot " + silf.angleY)
};


Rotate.prototype.onTouchStart = function (event) {
    var touch = event.touches[0];
    this.lastTouchPoint.set(touch.x, touch.y);
};


Rotate.prototype.onTouchMove = function (event) {
    var touch = event.touches[0];
    var dx = touch.x - this.lastTouchPoint.x;
    var dy = touch.y - this.lastTouchPoint.y;

    this.rotate(dx * 0.01, dy * 0.1);

    this.lastTouchPoint.set(touch.x, touch.y);
};

Rotate.prototype.onMouseMove = function (event) {
    var mouse = this.app.mouse;
    if (mouse.isPressed(pc.MOUSEBUTTON_LEFT)) {

    }
    this.rotate(event.dx * 0.2, event.dy * 0.2);
};


Rotate.prototype.update = function (dt) {
    if (silf.preAngleY == 0) {
        silf.postAngleY = -silf.y.getLocalEulerAngles().y * dt * 2;


        // console.log(silf.angleY)
    } else {
        silf.postAngleY = silf.preAngleY * dt * 5

    }
    if (silf.preAngleX == 0) {

        silf.postAngleX = -silf.entity.getLocalEulerAngles().x * dt * 2;

        // console.log(silf.angleY)
    } else {

        silf.postAngleX = silf.preAngleX * dt * 5
    }
    silf.angleY = pc.math.clamp(silf.y.getLocalEulerAngles().y + silf.postAngleY, -20, 20)
    silf.angleX = pc.math.clamp(silf.entity.getLocalEulerAngles().x + silf.postAngleX, -15, 15)

    silf.y.setLocalEulerAngles(0, silf.angleY, 0);
    silf.entity.setLocalEulerAngles(silf.angleX, 0, 0);

    silf.preAngleY = 0;
    silf.preAngleX = 0;
}