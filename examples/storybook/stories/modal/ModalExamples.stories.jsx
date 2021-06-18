import React from "react";

import { ModalProvider, useModal, useModalContent } from "@basedigital/modal";

export default {
  title: "Modal",
  component: useModal,
  argTypes: {},
  decorators: [
    (Story) => (
      <WrapWithProvider>
        <Story />
      </WrapWithProvider>
    ),
  ],
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
      <div style={{ background: "white", padding: "20px" }}>
        <div>{children}</div>

        <button onClick={() => context.close()}>Close this modal</button>
      </div>
    </div>
  );
};

const WrapWithProvider = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export const Example1 = ({ disableFocusLoop, initialSelector }) => {
  const modal = useModal({
    disableFocusLoop: disableFocusLoop,
    initialSelector: initialSelector,
    open: false,
    component: (
      <MyDefaultModal>
        <p>
          This is the modal content, the focus will automatically go to the
          <br></br>
          first focusable element, you can change it if you want.
        </p>
        <p>
          <label>
            My input: <input type="text" />
          </label>
        </p>
        <p>
          <label>
            My textarea: <textarea />
          </label>
        </p>
        <p>
          Also, it will kidnap the focus, so you can't focus on elements behind
          the modal
        </p>
      </MyDefaultModal>
    ),
  });

  return (
    <div>
      {modal.elem}
      <button onClick={() => (!modal.isOpen ? modal.open() : modal.close())}>
        Toggle modal
      </button>

      <p>{modal.isOpen ? "Modal is open" : "Modal is closed"}</p>
    </div>
  );
};

Example1.args = {
  disableFocusLoop: false,
  initialSelector: "textarea",
};
