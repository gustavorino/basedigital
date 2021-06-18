import React from "react";

type ModalContextType = {
  portalElem?: HTMLDivElement | null;
  onModalOpen: (id: number) => void;
  onModalClose: (id: number) => void;
};
const defaultContext: ModalContextType = {
  portalElem: null,
  onModalOpen: () => {},
  onModalClose: () => {},
};

const ModalContext = React.createContext(defaultContext);

type ModalInnerContextType = {
  close(): void;
};
const defaultInnerContext: ModalInnerContextType = {
  close() {
    throw new Error("This component is not inside a modal");
  },
};
const ModalInnerContext = React.createContext(defaultInnerContext);

export { ModalContext, ModalInnerContext };
