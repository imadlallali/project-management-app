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
      className="backdrop:bg-stone-900/90 p-6 rounded-md shadow-md"
      onClose={onClose}
    >
      {children}
      <form method="dialog" className="text-right mt-4">
        <Button onClick={onClose}>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Modal;
