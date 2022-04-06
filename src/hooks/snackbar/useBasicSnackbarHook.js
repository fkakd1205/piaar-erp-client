import { useState } from "react";
import BasicSnackbar from "../../component/module/snackbar/BasicSnackbar";

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open - [true, false]
 * @param {string} props.message
 * @param {function} props.onClose
 * @param {string} props.severity - [success, error, warning, info]
 * @param {string} props.vertical - [top, bottom]
 * @param {string} props.horizontal - [left, center, right]
 * @param {number} props.duration - [1000, 2000 ...] ms
 * @returns 
 */

function BasicSnackbarHookComponent({
    open,
    message,
    onClose,
    severity,
    vertical,
    horizontal,
    duration
}) {
    return (
        <BasicSnackbar
            open={open}
            onClose={onClose}
            message={message}
            severity={severity}
            vertical={vertical}
            horizontal={horizontal}
            duration={duration}
        ></BasicSnackbar>
    );
}

const useBasicSnackbarHook = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const onActionOpen = (message) => {
        setMessage(message);
        setOpen(true);
    }

    const onActionClose = () => {
        setOpen(false);
        setMessage('');
    }

    return {
        open: open,
        message: message,
        onActionOpen: onActionOpen,
        onActionClose: onActionClose
    }
}
export { useBasicSnackbarHook, BasicSnackbarHookComponent };