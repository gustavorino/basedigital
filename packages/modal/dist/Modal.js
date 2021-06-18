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
exports.Modal = void 0;
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
var react_1 = __importStar(require("react"));
var FIRST_SELECTOR = "a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex=\"-1\"]), textarea, select";
function Modal(props) {
    var modal = react_1.useRef(null);
    var focusOnFirst = react_1.useCallback(function () {
        var _a;
        var search = (_a = modal.current) === null || _a === void 0 ? void 0 : _a.querySelector(FIRST_SELECTOR);
        search && search.focus();
    }, []);
    var setModal = react_1.useCallback(function (ref) {
        var _a;
        modal.current = ref;
        if (ref) {
            // null should bypass initial focus completely
            if (props.initialSelector !== null) {
                var input = (_a = modal.current) === null || _a === void 0 ? void 0 : _a.querySelector(props.initialSelector || FIRST_SELECTOR);
                if (input) {
                    input.focus();
                }
                else {
                    focusOnFirst();
                }
            }
        }
    }, [modal, focusOnFirst, props.initialSelector]);
    var focusOnLast = react_1.useCallback(function () {
        var _a;
        var search = (_a = modal.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll(FIRST_SELECTOR);
        if (!search) {
            return;
        }
        (search === null || search === void 0 ? void 0 : search.length) > 0 && search[(search === null || search === void 0 ? void 0 : search.length) - 1].focus();
    }, []);
    return (react_1.default.createElement("div", { className: "Modal" },
        !props.disableFocusLoop && (react_1.default.createElement("div", { onFocus: focusOnLast, role: "none", tabIndex: 0 })),
        react_1.default.createElement("div", { ref: setModal, className: "Modal__children" }, props.children),
        !props.disableFocusLoop && (react_1.default.createElement("div", { onFocus: focusOnFirst, role: "none", tabIndex: 0 }))));
}
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map