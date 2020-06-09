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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PureAsyncStore = void 0;
var AsyncStore_1 = require("./AsyncStore");
var Helper_1 = require("./Helper");
/**
 * Хранилище состояния чистой асинхронной функции.
 */
var PureAsyncStore = /** @class */ (function (_super) {
    __extends(PureAsyncStore, _super);
    /**
     * @inheritdoc
     */
    function PureAsyncStore(fn) {
        var _this = this;
        var nextFn = Helper_1.Helper.getMemoized(fn);
        _this = _super.call(this, nextFn) || this;
        return _this;
    }
    return PureAsyncStore;
}(AsyncStore_1.AsyncStore));
exports.PureAsyncStore = PureAsyncStore;
