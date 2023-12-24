import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";


type Props = {
  closeModals: () => boolean;
  children: React.ReactNode
};

const modalsContainer = document.querySelector("#modals");


const Modal = ({ closeModals, children }: Props): React.JSX.Element => {


  React.useEffect(() => {
    const handleEscKeydown = (event: KeyboardEvent) => {
      event.key === "Escape" && closeModals();
    };

    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);


  return ReactDOM.createPortal(
    <div>
      <div className={modalStyles.theModal}>
        <button type="button" className={modalStyles.closeButton}>
          <CloseIcon type="primary" onClick={closeModals} />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={closeModals} />
    </div>,
    modalsContainer!
  );
};


export default Modal;