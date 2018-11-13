"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjUtil = /** @class */ (function () {
    function ObjUtil() {
    }
    ObjUtil.mapToObj = function (map) {
        var _this = this;
        var out = Object.create(null);
        map.forEach(function (value, key) {
            if (value instanceof Map) {
                out[key] = _this.mapToObj(value);
            }
            else {
                out[key] = value;
            }
        });
        return out;
    };
    return ObjUtil;
}());
exports.ObjUtil = ObjUtil;
