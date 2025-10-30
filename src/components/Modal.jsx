import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = function Modal({ open, children, buttonCaption, onClose }) {
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
      <div className="p-6">{children}</div>
      <div className="px-6 pb-6 flex justify-center">
        <Button onClick={onClose} variant="primary" className="px-6 py-2">
          {buttonCaption}
        </Button>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Modal;
