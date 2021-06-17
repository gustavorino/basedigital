import React from "react";

import { ModalProvider, useModal, useModalContent } from "@basedigital/modal";

export default {
  title: "Modal/Examples",
  component: useModal,
  argTypes: {},
};

const MyDefaultModal = ({ children }) => {
  const context = useModalContent();

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        background: " rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        zIndex: 10,
      }}
    >
      <div style={{ background: "white", padding: "10px" }}>
        <p>{children}</p>
        <button onClick={() => context.close()}>Close this modal</button>
      </div>
    </div>
  );
};

const WrapWithProvider = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

const Example1Comp = () => {
  const modal = useModal({
    modal: <MyDefaultModal>This is the modal content</MyDefaultModal>,
  });

  return (
    <div style={{ background: "#EEE", padding: "10px" }}>
      {modal.elem}
      <button onClick={() => (!modal.isOpen ? modal.open() : modal.close())}>
        Toggle modal
      </button>

      <p>{modal.isOpen ? "Modal is open" : "Modal is closed"}</p>
    </div>
  );
};

export const Example1 = () => {
  return (
    <WrapWithProvider>
      <Example1Comp />
    </WrapWithProvider>
  );
};
