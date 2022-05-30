// import { Component } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({close, children}) => {
    useEffect(() => {
        document.addEventListener("keydown", closeModal)
        return () => {
            document.removeEventListener("keydown", closeModal)

        }
    })    

    const closeModal = (e) => {
        if (e.code === "Escape") {
            close();
            return;
        }
        if(e.target === e.currentTarget) {
            close();
        }
    }
   
    return createPortal(
        <div className={styles.Overlay} onClick={closeModal}>
            <div className={styles.Modal}>
                {children}
            </div>
        </div>,
        modalRoot,
    )    
}

export default Modal;