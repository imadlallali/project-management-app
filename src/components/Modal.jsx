import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { createPortal } from "react-dom";
import Button from './Button';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialogRef = useRef(null);

    function openDialog() {
        dialogRef.current?.showModal();
    }

    useImperativeHandle(ref, () => ({
        openDialog,
    }), []);

    return createPortal(
        <dialog 
        ref={dialogRef} 
        className="backdrop:bg-stone-900/90 p-6 rounded-md shadow-md"
        >
            {children}
            <form method="dialog" className="text-right mt-4">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById("modal-root")
    );
});

export default Modal;