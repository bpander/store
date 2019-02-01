"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var copy = function (x) {
    if (Array.isArray(x)) {
        return x.slice();
    }
    else if (x && typeof x === 'object') {
        return __assign({}, x);
    }
    else {
        return x;
    }
};
var lensImpl = function (get, setSelf) {
    var compose = function (other) {
        return lensImpl(function (t) { return other.get(get(t)); }, function (v) { return function (t) {
            return setSelf(other.set(v)(get(t)))(t);
        }; });
    };
    var k = function (key) {
        return compose(lensImpl(function (t) { return t[key]; }, function (v) { return function (t) {
            if (v === t[key]) {
                return t;
            }
            var copied = copy(t);
            copied[key] = v;
            return copied;
        }; }));
    };
    var set = function (modifier) {
        if (typeof modifier === 'function') {
            return function (t) { return setSelf(modifier(get(t)))(t); };
        }
        else {
            return setSelf(modifier);
        }
    };
    return { get: get, set: set, k: k };
};
exports.lens = function () { return lensImpl(function (t) { return t; }, function (v) { return function (_) { return v; }; }); };
