import { useState } from "react";
import SocketConnectLoading from "../../component/module/loading/SocketConnectLoading";

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @returns 
 */
function SocketConnectLoadingHookComponent({ open }) {
    return (
        <SocketConnectLoading
            open={open}
        ></SocketConnectLoading>
    );
}

const useSocketConnectLoadingHook = () => {
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
export { useSocketConnectLoadingHook, SocketConnectLoadingHookComponent };