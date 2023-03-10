import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  onHideCart: () => void;
  children: React.ReactNode;
}

const PortalElement = document.getElementById('overlays');

function Backdrop({ onHideCart }: { onHideCart: () => void }) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onHideCart();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onHideCart} onKeyDown={handleKeyDown} tabIndex={-1} role="button" aria-label="Close" />
  );
}

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

function Modal({ onHideCart, children }: ModalProps) {
  return (
    <>
      {PortalElement && ReactDOM.createPortal(<Backdrop onHideCart={onHideCart} />, PortalElement)}
      {PortalElement && ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, PortalElement)}
    </>
  );
}

export default Modal;
