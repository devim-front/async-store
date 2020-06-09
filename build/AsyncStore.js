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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncStore = void 0;
var store_1 = require("@devim-front/store");
var mobx_1 = require("mobx");
var Helper_1 = require("./Helper");
/**
 * Хранилище состояния асинхронной функции.
 */
var AsyncStore = /** @class */ (function (_super) {
    __extends(AsyncStore, _super);
    /**
     * Создает экземпляр хранилища для указанной функции.
     *
     * @param fn Асинхронная функция.
     */
    function AsyncStore(fn) {
        var _this = _super.call(this) || this;
        /**
         * Указывает, что в данный момент асинхронная функция выполняется.
         */
        _this.isPending = false;
        /**
         * Указывает, что в последний раз асинхронная функция завершилась успешно.
         */
        _this.isSuccess = false;
        /**
         * Указывает, что в последний раз асинхронная функция завершилась с ошибкой.
         */
        _this.isFailure = false;
        _this.fn = Helper_1.Helper.getSafe(fn);
        return _this;
    }
    /**
     * Создает экземпляр хранилища состояния указанной асинхронной функции.
     *
     * @param fn Функция.
     */
    AsyncStore.create = function (fn) {
        return new this(fn);
    };
    Object.defineProperty(AsyncStore.prototype, "isDone", {
        /**
         * Указывает, что выполнение асинхронной функции было завершено (с ошибкой
         * или без).
         */
        get: function () {
            return this.isSuccess || this.isFailure;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Указывает, что асинхроная функция начала выполняться.
     */
    AsyncStore.prototype.setPending = function () {
        this.isPending = true;
    };
    /**
     * Указывает, что асинхронная функция завершилась успешно.
     *
     * @param value Результат выполнения асинхронной функции.
     */
    AsyncStore.prototype.setValue = function (value) {
        this.isPending = false;
        this.isSuccess = true;
        this.isFailure = false;
        this.value = value;
        this.error = undefined;
    };
    /**
     * Указывает, что асинхронная функция завершилась с ошибкой.
     *
     * @param error Ошибка.
     */
    AsyncStore.prototype.setError = function (error) {
        this.isPending = false;
        this.isSuccess = false;
        this.isFailure = true;
        this.value = undefined;
        this.error = error;
    };
    /**
     * Выполняет асинхронную функцию и возвращает её результат.
     *
     * @param args Аргументы.
     */
    AsyncStore.prototype.call = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var value, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setPending();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fn.apply(this, args)];
                    case 2:
                        value = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.setError(error_1);
                        throw error_1;
                    case 4:
                        this.setValue(value);
                        return [2 /*return*/, value];
                }
            });
        });
    };
    /**
     * @inheritdoc
     */
    AsyncStore.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.value = undefined;
        this.error = undefined;
        this.isSuccess = false;
        this.isFailure = false;
        this.isPending = false;
    };
    __decorate([
        mobx_1.observable
    ], AsyncStore.prototype, "value", void 0);
    __decorate([
        mobx_1.observable
    ], AsyncStore.prototype, "error", void 0);
    __decorate([
        mobx_1.observable
    ], AsyncStore.prototype, "isPending", void 0);
    __decorate([
        mobx_1.observable
    ], AsyncStore.prototype, "isSuccess", void 0);
    __decorate([
        mobx_1.observable
    ], AsyncStore.prototype, "isFailure", void 0);
    __decorate([
        mobx_1.computed
    ], AsyncStore.prototype, "isDone", null);
    __decorate([
        mobx_1.action
    ], AsyncStore.prototype, "setPending", null);
    __decorate([
        mobx_1.action
    ], AsyncStore.prototype, "setValue", null);
    __decorate([
        mobx_1.action
    ], AsyncStore.prototype, "setError", null);
    return AsyncStore;
}(store_1.FreeStore));
exports.AsyncStore = AsyncStore;
