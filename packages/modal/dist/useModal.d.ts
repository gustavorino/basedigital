import { ReactNode } from "react";
declare type UseModalParams = {
    closeEnabled?: boolean;
    modal: ReactNode;
    open?: boolean;
    initialSelector?: string;
};
export declare function useModal<M>(data: UseModalParams): {
    isOpen: boolean;
    open: (meta?: M, onCloseCallback?: () => void) => void;
    close: () => void;
    elem: JSX.Element;
};
export declare function useModalContent(): {
    closeEnabled: boolean;
    close(): void;
};
export {};
