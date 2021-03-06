"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var StoreContext_1 = require("./StoreContext");
exports.injectStore = function (mapStoreToProps) {
    return function (Component) {
        return /** @class */ (function (_super) {
            __extends(WrappedComponent, _super);
            function WrappedComponent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.innerRender = function (value) { return (value.store && <Component {...mapStoreToProps(value.store, _this.props)}/>); };
                return _this;
            }
            WrappedComponent.prototype.render = function () {
                return <StoreContext_1.StoreContext.Consumer>{this.innerRender}</StoreContext_1.StoreContext.Consumer>;
            };
            return WrappedComponent;
        }(react_1.default.Component));
    };
};
