import React, { useRef, useEffect } from 'react';
import { createPortal } from "react-dom";
import Button from './Button';

const Modal = function Modal({ open, children, buttonCaption, onClose, actions }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const modal = dialogRef.current;

        if (open) {
            modal?.showModal();
        } else {
            modal?.close();
        }
    }, [open]);

    return createPortal(
        <dialog
            ref={dialogRef}
            className="modal-content p-0 max-w-md w-full"
            onClose={onClose}
        >
            <div className="p-6">
                {children}
            </div>
            {(actions || buttonCaption) && (
                <div className="px-6 pb-6 flex justify-end gap-4">
                    {actions ? actions : (
                        <Button onClick={onClose} variant="primary" className="px-6 py-2">
                            {buttonCaption}
                        </Button>
                    )}
                </div>
            )}
        </dialog>,
        document.getElementById("modal-root")
    );
};

export default Modal;
