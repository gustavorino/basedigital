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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModalContent = exports.useModal = void 0;
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var Modal_1 = require("./Modal");
var ModalContext_1 = require("./ModalContext");
var uid = 0;
function getNextId() {
    return ++uid;
}
function useModal(data) {
    var context = react_1.useContext(ModalContext_1.ModalContext);
    var uid = react_1.useRef(getNextId());
    var _a = react_1.useState(!!data.open), isOpen = _a[0], setIsOpen = _a[1];
    var _b = react_1.useState(), meta = _b[0], setMeta = _b[1];
    var onCloseRef = react_1.useRef();
    react_1.useEffect(function () {
        isOpen
            ? context.onModalOpen(uid.current)
            : context.onModalClose(uid.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    react_1.useEffect(function () {
        var id = uid.current;
        return function () {
            context.onModalClose(id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.onModalClose]);
    var openModal = react_1.useCallback(function (meta, onCloseCallback) {
        onCloseRef.current = onCloseCallback;
        setMeta(meta);
        setIsOpen(true);
    }, [setIsOpen]);
    var closeModal = react_1.useCallback(function () {
        setIsOpen(false);
        if (onCloseRef.current) {
            onCloseRef.current();
            onCloseRef.current = undefined;
        }
    }, [setIsOpen]);
    return {
        isOpen: isOpen,
        open: openModal,
        close: closeModal,
        elem: isOpen ? (react_1.default.createElement(WithPortal, { portalElem: context.portalElem },
            react_1.default.createElement(WithInnerModalContext, { contextData: {
                    close: closeModal,
                    closeEnabled: data.closeEnabled === undefined ? true : !!data.closeEnabled,
                } },
                react_1.default.createElement(Modal_1.Modal, { initialSelector: data.initialSelector }, typeof data.modal === "function"
                    ? data.modal({ onClose: closeModal })
                    : react_1.default.cloneElement(data.modal, {
                        onClose: closeModal,
                        meta: meta,
                    }))))) : undefined,
    };
}
exports.useModal = useModal;
function WithInnerModalContext(props) {
    return (react_1.default.createElement(ModalContext_1.ModalInnerContext.Provider, { value: props.contextData }, props.children));
}
function WithPortal(props) {
    var portalElem = props.portalElem, children = props.children;
    if (!portalElem) {
        throw new Error("Portal elem not ready, did you wrap your modal component with a ModalProvider?");
    }
    return react_dom_1.default.createPortal(children, portalElem);
}
function useModalContent() {
    return react_1.useContext(ModalContext_1.ModalInnerContext);
}
exports.useModalContent = useModalContent;
//# sourceMappingURL=useModal.js.map