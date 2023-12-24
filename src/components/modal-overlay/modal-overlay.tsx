import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";


type Props = {
  onClick: () => boolean
};

const ModalOverlay = ({ onClick }: Props): React.JSX.Element => {
  return <div className={modalOverlayStyles.overlay} onClick={onClick}></div>;
};


export default ModalOverlay;