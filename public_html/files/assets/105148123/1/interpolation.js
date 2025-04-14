function interpolation(current, interp, lerpFunc, isVector, target, source) {
    var passed = interp;
    return {
        get current () {
            return current;
        },
        interpolateTo: function(t) {
            if (isVector ? t.equals(target) : t === target) return;
            if (isVector) {
                target.copy(t);
                source.copy(current);
            } else {
                target = t;
                source = current;
            }
            passed = 0;
        },
        update: function(dt, updateFunc, thisArg) {
            if (passed >= interp) return;
            passed += dt;
            alpha = pc.math.clamp(passed / interp, 0, 1);
            current = lerpFunc(source, target, alpha);
            if (updateFunc) updateFunc.call(thisArg, current);
        }
    };
}


function numberInterpolation(current, interp) {
    return interpolation(current, interp, pc.math.lerp);
}


function angleInterpolation(current, interp) {
    return interpolation(current, interp, pc.math.lerpAngle);
}


function vec3Interpolation(current, interp) {
    return interpolation(current, interp, current.lerp.bind(current), true, new pc.Vec3(), new pc.Vec3());
}


/*
Usage

var angle = angleInterpolation(0, 0.1);
angle.interpolateTo(180);

var vec3 = vec3Interpolation(new pc.Vec3(), 0.15);
vec3.interpolateTo(new pc.Vec3(10, 10, 10));

update = function(dt) {
    angle.update(dt, function(currentAngle) {
        this.entity.setEulerAngles(0, currentAngle, 0);
    }, this);

    vec3.update(dt, function(current) {
        console.log('Current value of vec3: ', current);
    });
};
*/