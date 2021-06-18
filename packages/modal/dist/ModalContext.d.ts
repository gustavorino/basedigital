import React from "react";
declare type ModalContextType = {
    portalElem?: HTMLDivElement | null;
    onModalOpen: (id: number) => void;
    onModalClose: (id: number) => void;
};
declare const ModalContext: React.Context<ModalContextType>;
declare type ModalInnerContextType = {
    close(): void;
};
declare const ModalInnerContext: React.Context<ModalInnerContextType>;
export { ModalContext, ModalInnerContext };
