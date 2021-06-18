"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalInnerContext = exports.ModalContext = void 0;
var react_1 = __importDefault(require("react"));
var defaultContext = {
    portalElem: null,
    onModalOpen: function () { },
    onModalClose: function () { },
};
var ModalContext = react_1.default.createContext(defaultContext);
exports.ModalContext = ModalContext;
var defaultInnerContext = {
    close: function () {
        throw new Error("This component is not inside a modal");
    },
};
var ModalInnerContext = react_1.default.createContext(defaultInnerContext);
exports.ModalInnerContext = ModalInnerContext;
//# sourceMappingURL=ModalContext.js.map