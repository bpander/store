"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (prevFn, nextFn) { return function (value) { return prevFn(nextFn(value)); }; });
};
