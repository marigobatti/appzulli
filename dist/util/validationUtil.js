"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var ObjUtil_1 = require("./ObjUtil");
var ValidationUtil = /** @class */ (function () {
    function ValidationUtil() {
    }
    ValidationUtil.prototype.validateData = function (data, schema) {
        var options = { abortEarly: false };
        var errors = Joi.validate(data, schema, options);
        return errors.error ?
            this.buildUsefulErrorObject(errors.error.details) :
            false;
    };
    ValidationUtil.prototype.buildUsefulErrorObject = function (errors) {
        var errosCampos = new Map();
        errors.map(function (error, index) {
            errosCampos
                .set(error.path.join('_'), errors.filter(function (err) { return err.path.join('_') === error.path.join('_'); })
                .map(function (err) { return ({ type: err, context: err.context, message: err.message }); }));
        });
        return ObjUtil_1.ObjUtil.mapToObj(errosCampos);
    };
    return ValidationUtil;
}());
exports.ValidationUtil = ValidationUtil;
