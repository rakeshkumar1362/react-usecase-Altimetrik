import React from "react";
import "./carInfo.css";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  children: any;
}

function CarInfo({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="form-container">
        <div className="close-btn" onClick={onClose}>X</div>
      <div className="form-modal">
        
      </div>
      {children}
    </div>
  );
}

export default CarInfo;
