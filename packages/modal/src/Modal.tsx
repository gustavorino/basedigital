/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { PropsWithChildren, useCallback, useRef } from "react";

const FIRST_SELECTOR = `a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"]), textarea, select`;

type ModalProps = PropsWithChildren<{
  disableFocusLoop?: boolean;
  initialSelector?: string;
}>;
export function Modal(props: ModalProps) {
  const modal = useRef<HTMLDivElement | null>(null);

  const focusOnFirst = useCallback(() => {
    const search = modal.current?.querySelector(FIRST_SELECTOR);

    search && (search as HTMLElement).focus();
  }, []);

  const setModal = useCallback(
    (ref) => {
      modal.current = ref;
      if (ref) {
        // null should bypass initial focus completely
        if (props.initialSelector !== null) {
          const input = modal.current?.querySelector(
            props.initialSelector || FIRST_SELECTOR
          );
          if (input) {
            (input as HTMLElement).focus();
          } else {
            focusOnFirst();
          }
        }
      }
    },
    [modal, focusOnFirst, props.initialSelector]
  );

  const focusOnLast = useCallback(() => {
    const search = modal.current?.querySelectorAll(FIRST_SELECTOR);
    if (!search) {
      return;
    }
    search?.length > 0 && (search[search?.length - 1] as HTMLElement).focus();
  }, []);

  return (
    <div className="Modal">
      {!props.disableFocusLoop && (
        <div onFocus={focusOnLast} role="none" tabIndex={0} />
      )}
      <div ref={setModal} className="Modal__children">
        {props.children}
      </div>
      {!props.disableFocusLoop && (
        <div onFocus={focusOnFirst} role="none" tabIndex={0} />
      )}
    </div>
  );
}
