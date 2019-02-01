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
var StoreProvider = /** @class */ (function (_super) {
    __extends(StoreProvider, _super);
    function StoreProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.unsubscribe = null;
        _this.state = {
            storeState: _this.props.store.getState(),
        };
        return _this;
    }
    StoreProvider.prototype.componentDidMount = function () {
        this.subscribe();
    };
    StoreProvider.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.store !== prevProps.store) {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
            this.subscribe();
        }
    };
    StoreProvider.prototype.componentWillUnmount = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    };
    StoreProvider.prototype.subscribe = function () {
        var _this = this;
        var store = this.props.store;
        this.unsubscribe = store.subscribe(function (newStoreState) {
            _this.setState(function (providerState) {
                if (providerState.storeState === newStoreState) {
                    return null;
                }
                return { storeState: newStoreState };
            });
        });
    };
    StoreProvider.prototype.render = function () {
        return (<StoreContext_1.StoreContext.Provider value={{ store: this.props.store }}>
        {this.props.children}
      </StoreContext_1.StoreContext.Provider>);
    };
    return StoreProvider;
}(react_1.default.Component));
exports.StoreProvider = StoreProvider;
