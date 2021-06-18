import { ReactNode } from "react";
declare type UseModalParams = {
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
export declare function useModal<M>(data: UseModalParams): {
    isOpen: boolean;
    open: (meta?: M, onCloseCallback?: () => void) => void;
    close: () => void;
    elem: JSX.Element;
};
export declare function useModalContent(): {
    close(): void;
};
export {};
