"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalProvider = void 0;
var react_1 = __importStar(require("react"));
var ModalContext_1 = require("./ModalContext");
function refreshBodyClass(list, bodyClass) {
    if (bodyClass === void 0) { bodyClass = "ModalOpen"; }
    list.length > 0
        ? document.body.classList.add(bodyClass)
        : document.body.classList.remove(bodyClass);
}
function ModalProvider(props) {
    var children = props.children, bodyClass = props.bodyClass;
    var portalRef = react_1.useRef(null);
    var _a = react_1.useState(false), ready = _a[0], setReady = _a[1];
    var openedMap = react_1.useRef({});
    var onRef = react_1.useCallback(function (elem) {
        portalRef.current = elem;
        setReady(true);
    }, [portalRef, setReady]);
    var onModalOpen = react_1.useCallback(function (modal) {
        openedMap.current[modal] = true;
        refreshBodyClass(Object.keys(openedMap.current), bodyClass);
    }, [bodyClass]);
    var onModalClose = react_1.useCallback(function (modal) {
        delete openedMap.current[modal];
        refreshBodyClass(Object.keys(openedMap.current), bodyClass);
    }, [bodyClass]);
    return (react_1.default.createElement(ModalContext_1.ModalContext.Provider, { value: {
            onModalClose: onModalClose,
            onModalOpen: onModalOpen,
            portalElem: portalRef.current,
        } },
        react_1.default.createElement("div", { ref: onRef }),
        ready && children));
}
exports.ModalProvider = ModalProvider;
//# sourceMappingURL=ModalProvider.js.map