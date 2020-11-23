"use strict";

let res = getLevel(complex, 0);
console.log(res);

function getLevel(obj, level) {
    try {
        object_json = JSON.stringify(obj);
    }
    catch (RangeError) {
        console.log("Max level: " + level);
        return level;
    }

    const fieldAdd = {"Addition": obj};
    obj = fieldAdd;

    return getLevel(obj, level + 1);
}
