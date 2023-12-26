import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";


type Props = {
  onClick: () => void,
  children?: React.ReactNode
};

const ModalOverlay = ({ onClick }: Props): React.JSX.Element => {
  return <div className={modalOverlayStyles.overlay} onClick={onClick}></div>;
};


export default ModalOverlay;