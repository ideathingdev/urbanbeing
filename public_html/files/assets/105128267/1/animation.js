var Animation = pc.createScript('animation');
Animation.attributes.add('toRotate', { type: 'entity' });
Animation.attributes.add('orbitSensitivity', {
    type: 'number',
    default: 0.3,
    title: 'Orbit Sensitivity',
    description: 'How fast the camera moves around the orbit. Higher is faster'
});
Animation.attributes.add('occluder', { type: 'entity' });
Animation.attributes.add('river', { type: 'entity' });

Animation.attributes.add("grass", { type: "asset", assetType: "material", array: true });
Animation.attributes.add("occluderMat", { type: "asset", assetType: "material" });
Animation.attributes.add('blobs', { type: 'entity', array: true });
Animation.attributes.add('blobsArch', { type: 'entity', array: true });
Animation.attributes.add('blobsBack', { type: 'entity', array: true });
Animation.attributes.add('blobsServ', { type: 'entity', array: true });
Animation.attributes.add('blobsTeam', { type: 'entity', array: true });
Animation.attributes.add('blobsContatti', { type: 'entity', array: true });

Animation.attributes.add('cubes', { type: 'entity', array: true });


var self;
var val = 0;
var textScale = 1;
var textPos = 1.6;
var breakPos = 1;
var scrollValue = 0;
// initialize code called once per entity
Animation.prototype.initialize = function () {
    self = this;

    this.wheelDelta = 0;
    self.pezzi = this.app.root.findByTag(["pezzo"]);
    self.pezziPos = []
    for (let i = 0; i < self.pezzi.length; i++) {
        self.pezziPos.push(self.pezzi[i].getLocalPosition())
    }

    var mouse = this.app.mouse;

    this._mouseWheelChange = 0;
    scrollValue = 0;
    mouse.on(pc.EVENT_MOUSEWHEEL, this.onWheel, this);
    /////////////////////////////////////////////
    //////////////////////////FOR MOBILE
    self.residue = 0;
    self.dy = 0;
    this.inertia = 0.6;
    this.lastTouchPoint = new pc.Vec2();
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
    }

    this.on('destroy', function () {

        if (this.app.touch) {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
            this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        }
    }, this);


    //   function (e) {
    //    this._mouseWheelChange = e.wheelDelta;
    //  }, this);
    self.clamparize = function (min, max, to, func, one, f) {

        if (val >= min && val <= max) {
            one = false;
            var out = (val - min) / (max - min) * to;
            if (f != undefined) {
                func(out, f);
            } else {
                func(out);
            }



        } else if (val <= min && !one) {

            if (f != undefined) {
                func(0, f);
            } else {
                func(0);
            }

            one = true;

        } if (val >= max && !one) {

            if (f != undefined) {
                func(to, f);
            } else {
                func(to);
            }

            one = true;
        }
    };


    self.textclamparize = function (min, max, f) {
        var x = 0;
        if (val >= min && val <= max) {

            var out = (val - min) / (max - min);
            if (out < 0.3) {
                x = ((out) / (0.3)) * textScale
                // 1 - Math.abs(out - 0.3) * 2;
                f.setLocalScale(x * textScale, x * textScale, x * textScale);
                f.setLocalPosition(f.getLocalPosition().x, 0, f.getLocalPosition().z);
            } else if (out > 0.7) {

                var y = ((out - 0.7) / (1 - 0.7)) * textPos;
                console.log("text pos " + f + "  " + y)
                var poss = new pc.Vec3(f.getLocalPosition().x, y, f.getLocalPosition().z)
                f.setLocalPosition(poss);
            } else {
                f.setLocalScale(textScale, textScale, textScale);
                f.setLocalPosition(f.getLocalPosition().x, 0, f.getLocalPosition().z);
            }

        } else if (val <= min) {
            f.setLocalScale(0, 0, 0);
            f.setLocalPosition(f.getLocalPosition().x, 0, f.getLocalPosition().z);

        } if (val >= max) {
            f.setLocalScale(textScale, textScale, textScale);
            f.setLocalPosition(f.getLocalPosition().x, textPos, f.getLocalPosition().z);
        }

    };

    self.grassTile = new pc.Vec2(10, 10);
    //////HIDE GRASS
    for (let i = 0; i < self.grass.length; i++) {

        self.grass[i].resource.diffuseMapTiling = self.grassTile
        self.grass[i].resource.opacityMapTiling = self.grassTile
        self.grass[i].resource.update();
    }
    /////////////////////////////////////////STEPS
    //////////////////////////////////////////////

    //fase 1 opacity occluder


    // var occOpacity = 1 - clamped1;
    self.oneOcclu = false;
    self.funcOccluder = function (clamped1) {
        self.occluderMat.resource.opacity = 1 - clamped1;
        self.occluderMat.resource.update();
    }


    //fase 2 pezzi scale

    //  var x = 100 - self.clamparize(1, 2, 15);
    self.oneBreak = false;
    self.funcBreak = function (a) {
        var x = 100 - a;
        for (let i = 0; i < self.pezzi.length; i++) {
            self.pezzi[i].setLocalScale(x, x, x * 1.11517);
        }
    }

    //fase 3 pezzi in air a
    // var ya = self.clamparize(2, 4, 150) //* e.wheelDelta;
    self.oneAir1 = false;
    self.funcAir1 = function (ya) {
        //console.log("pos  " + ya)
        for (let i = 0; i < self.pezzi.length; i++) {
            if (i >= 0 && i <= 5) {
                let pos = self.pezziPos[i];
                self.pezzi[i].setLocalPosition(pos.x, ya, pos.z);
            }
        }
    };

    self.oneAir2 = false;
    self.funcAir2 = function (yb) {
        for (let i = 0; i < self.pezzi.length; i++) {
            if (i >= 6 && i <= 12) {
                let pos = self.pezziPos[i];
                self.pezzi[i].setLocalPosition(pos.x, yb, pos.z);
            }
        }

    };

    self.oneAir3 = false;
    self.funcAir3 = function (yc) {
        for (let i = 0; i < self.pezzi.length; i++) {
            if (i >= 13 && i <= 17) {
                let pos = self.pezziPos[i];
                self.pezzi[i].setLocalPosition(pos.x, yc, pos.z);
            }
        }
    };

    self.oneAir4 = false;
    self.funcAir4 = function (yd) {
        for (let i = 0; i < self.pezzi.length; i++) {
            if (i >= 18) {
                let pos = self.pezziPos[i];
                self.pezzi[i].setLocalPosition(pos.x, yd, pos.z);
            }
        }
    };


    self.oneGrass = false;
    self.funcGrass = function (tile) {
        self.grassTile.x = 10 - tile;
        self.grassTile.y = 10 - tile;
        for (let i = 0; i < self.grass.length; i++) {

            self.grass[i].resource.diffuseMapTiling = self.grassTile;
            self.grass[i].resource.opacityMapTiling = self.grassTile;
            self.grass[i].resource.update();
        }
    }

    self.oneRiver = false;
    self.funcRiver = function (add) {
        var riverPos = -0.05 + add
        self.river.setLocalPosition(0, riverPos, 0)
    }


    self.oneCube = false;

    self.funcCube = function (x, f) {
        self.cubes[f].setLocalScale(x, x, x);

    }


    self.oneHtml = false;
    self.funcHtml = function (add) {
        var num = 100 - add
        htmlUI.style.top = num.toString() + '%';
    }

};

Animation.prototype.onTouchStart = function (event) {
    var touch = event.touches[0];
    this.lastTouchPoint.set(touch.x, touch.y);
    self.residue = 0;
};

Animation.prototype.onTouchEnd = function (event) {
    var touch = event.touches[0];

    self.residue = pc.math.clamp(self.dy * -0.02, -0.5, 0.5)

};

Animation.prototype.onTouchMove = function (event) {
    var touch = event.touches[0];
    var dx = touch.x - this.lastTouchPoint.x;

    self.dy = touch.y - this.lastTouchPoint.y;
    this._mouseWheelChange = self.dy * -0.08;
    this.lastTouchPoint.set(touch.x, touch.y);
}

Animation.prototype.onWheel = function (e) {

    this._mouseWheelChange = e.wheelDelta;
    self.residue = e.wheelDelta * 0.8
}
// update code called every frame
Animation.prototype.update = function (dt) {

    // if (scrollValue >= 0 && scrollValue < 100) {


    if (mobile) {
        if (self.residue > 0) {
            self.residue = self.residue - 0.05
            if (self.residue < 0) self.residue = 0
        } else if (self.residue < 0) {
            self.residue = self.residue + 0.05
            if (self.residue > 0) self.residue = 0
        }

    } else {
        if (self.residue < 0) {
            self.residue = self.residue + 0.05
            if (self.residue > 0) self.residue = 0
        } else if (self.residue > 0) {
            self.residue = self.residue - 0.05
            if (self.residue < 0) self.residue = 0
        }

    }

    var inertiaFactor = Math.min(dt / this.inertia, 1);
    scrollValue = pc.math.clamp(pc.math.lerp(scrollValue, scrollValue + (self._mouseWheelChange + self.residue), inertiaFactor), 0, 12);
    val = pc.math.clamp(scrollValue, 0, 11);




    // this.app.root.findByName("debug").element.text = self.residue.toString();
    this._mouseWheelChange = 0;
    //console.log(val)

    //fase 1 opacity occluder
    self.clamparize(0, 1, 1, self.funcOccluder, self.oneOcclu);
    //motto
    self.textclamparize(-1, 1, self.blobs[0]);
    //2
    self.clamparize(1, 2, 15, self.funcBreak, self.oneBreak);

    //about
    self.textclamparize(1.5, 2.5, self.blobs[1]);
    //3
    self.clamparize(2, 4, 150 * breakPos, self.funcAir1, self.oneAir1);

    //fase 3 pezzi in air b
    self.clamparize(2.3, 4.2, 150 * breakPos, self.funcAir2, self.oneAir2)

    //fase 3 pezzi in air c
    self.clamparize(3.2, 5, 150 * breakPos, self.funcAir3, self.oneAir3)

    //fase 3 pezzi in air d
    self.clamparize(3.5, 4.5, 150 * breakPos, self.funcAir4, self.oneAir4)

    /////////////progetti 1
    self.textclamparize(3 - 0.1, 4 - 0.1, self.blobsArch[0]);
    self.textclamparize(3 - 0.1, 4 - 0.1, self.blobsArch[2]);
    self.textclamparize(3.1 - 0.1, 4.1 - 0.1, self.blobsArch[3]);
    if (mobile) {

        self.textclamparize(4, 5, self.blobsArch[1]);
        self.textclamparize(4, 5, self.blobsArch[4]);
        self.textclamparize(4, 5, self.blobsArch[5]);

    } else {
        self.textclamparize(3.15 - 0.1, 4.05 - 0.1, self.blobsArch[1]);
        self.textclamparize(3.2 - 0.1, 4.15 - 0.1, self.blobsArch[4]);
        self.textclamparize(3.3 - 0.1, 4.2 - 0.1, self.blobsArch[5]);

    }




    //fase 4 grass
    self.clamparize(2.5, 7, 9, self.funcGrass, self.oneGrass);

    self.clamparize(3, 7, 0.05, self.funcRiver, self.oneRiver);

    //progetti 2
    self.textclamparize(5.2, 6.2, self.blobsBack[0]);
    self.textclamparize(5.2, 6.2, self.blobsBack[2]);
    if (mobile) {

        self.textclamparize(6, 7, self.blobsBack[1]);
        self.textclamparize(6, 7, self.blobsBack[3]);
    }
    else {

        self.textclamparize(5.3, 6.3, self.blobsBack[1]);
        self.textclamparize(5.3, 6.3, self.blobsBack[3]);
    }
    /////////////////////////////////////////////////
    //step cubes 1
    if (mobile) {
        self.clamparize(7.5, 8.5, 0.5, self.funcCube, self.oneCube, 0);
        self.clamparize(7.7, 8.7, 0.5, self.funcCube, self.oneCube, 1);
        self.clamparize(7.9, 8.9, 0.5, self.funcCube, self.oneCube, 2);
    }
    else {

        self.clamparize(7.5, 8.5, 0.5, self.funcCube, self.oneCube, 0);
        self.clamparize(7.7, 8.7, 0.5, self.funcCube, self.oneCube, 1);
        self.clamparize(7.9, 8.9, 0.5, self.funcCube, self.oneCube, 2);
    }
    //cube 2
    for (let i = 3; i <= 18; i++) {
        self.clamparize(9.5, 10.5, 0.5, self.funcCube, self.oneCube, i);
    }

    for (let i = 19; i < self.cubes.length; i++) {
        self.clamparize(9.7, 10.7, 0.5, self.funcCube, self.oneCube, i);
    }


    /////////////////servizi
    if (mobile) {
        for (let i = 0; i < self.blobsServ.length; i++) {
            self.textclamparize(7, 8, self.blobsServ[i]);
        }

    }
    else {
        for (let i = 0; i < self.blobsServ.length; i++) {
            self.textclamparize(6.3, 7.3, self.blobsServ[i]);
        }

    }



    //team

    if (mobile) {

        for (let i = 0; i < self.blobsTeam.length; i++) {
            self.textclamparize(8, 9, self.blobsTeam[i]);
        }
    }
    else {

        for (let i = 0; i < self.blobsTeam.length; i++) {
            self.textclamparize(7.6, 8.6, self.blobsTeam[i]);
        }
    }

    //CONTATTI


    if (mobile) {
        for (let i = 0; i < self.blobsContatti.length; i++) {
            self.textclamparize(9, 11, self.blobsContatti[i]);
        }

    }
    else {

        for (let i = 0; i < self.blobsContatti.length; i++) {
            self.textclamparize(8.6, 10.6, self.blobsContatti[i]);
        }
    }
    //cubes 3

    //cubes 4


    if (htmlUI != undefined) {
        self.clamparize(11, 12, 100, self.funcHtml, self.oneHtml);

    }
};

