import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Modal } from "./Modal";
import { ModalContext, ModalInnerContext } from "./ModalContext";

let uid = 0;
function getNextId() {
  return ++uid;
}

type UseModalParams = {
  component: ReactNode;
  open?: boolean;
  /**
   * The initial selector for that modal, eg: ".my-custom-input"
   * - Use 'null' to disable the initial focus
   * - Default: focusable elements
   */
  initialSelector?: string | null;

  /**
   * Enable/disable modal focus loop.
   * - Setting this to false doesn't disable initialSelector
   * - Default true.
   */
  disableFocusLoop?: boolean;
};
export function useModal<M>(data: UseModalParams) {
  const context = useContext(ModalContext);
  const uid = useRef(getNextId());
  const [isOpen, setIsOpen] = useState(!!data.open);
  const [meta, setMeta] = useState<M>();
  const onCloseRef = useRef<() => void>();

  useEffect(() => {
    isOpen
      ? context.onModalOpen(uid.current)
      : context.onModalClose(uid.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const id = uid.current;
    return () => {
      context.onModalClose(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.onModalClose]);

  const openModal = useCallback(
    (meta?: M, onCloseCallback?: () => void) => {
      onCloseRef.current = onCloseCallback;
      setMeta(meta);
      setIsOpen(true);
    },
    [setIsOpen]
  );

  const closeModal = useCallback(() => {
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
    elem: isOpen ? (
      <WithPortal portalElem={context.portalElem}>
        <WithInnerModalContext
          contextData={{
            close: closeModal,
          }}
        >
          <Modal
            disableFocusLoop={data.disableFocusLoop}
            initialSelector={data.initialSelector}
          >
            {typeof data.component === "function"
              ? data.component({ onClose: closeModal })
              : React.cloneElement(data.component as any, {
                  onClose: closeModal,
                  meta: meta,
                })}
          </Modal>
        </WithInnerModalContext>
      </WithPortal>
    ) : undefined,
  };
}

function WithInnerModalContext(props: {
  children: ReactNode;
  contextData: { close(): void };
}) {
  return (
    <ModalInnerContext.Provider value={props.contextData}>
      {props.children}
    </ModalInnerContext.Provider>
  );
}

function WithPortal(props: {
  portalElem?: HTMLDivElement | null;
  children: ReactNode;
}) {
  const { portalElem, children } = props;
  if (!portalElem) {
    throw new Error(
      "Portal elem not ready, did you wrap your modal component with a ModalProvider?"
    );
  }
  return ReactDOM.createPortal(children, portalElem);
}

export function useModalContent() {
  return useContext(ModalInnerContext);
}
