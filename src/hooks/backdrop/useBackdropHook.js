import { useState } from "react";
import BackdropLoadingComponent from "../../component/module/loading/BackdropLoadingComponent";

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @returns 
 */
function BackdropHookComponent({ open, onClose }) {
    return (
        <BackdropLoadingComponent
            open={open}
            onClose={onClose}
        ></BackdropLoadingComponent>
    );
}

const useBackdropHook = () => {
    const [open, setOpen] = useState(false);

    const onActionOpen = () => {
        setOpen(true);
    }

    const onActionClose = () => {
        setOpen(false);
    }

    return {
        open: open,
        onActionOpen: onActionOpen,
        onActionClose: onActionClose
    }
}
export { useBackdropHook, BackdropHookComponent };