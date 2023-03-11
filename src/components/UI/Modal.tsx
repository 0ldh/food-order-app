import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  onHideCart: () => void;
  children: React.ReactNode;
}

const portalElement = document.getElementById('overlays');

function Backdrop({ onHideCart }: { onHideCart: () => void }) {
  const tabIndex = 3;
  return (
    <div className={styles.backdrop} onClick={onHideCart} tabIndex={tabIndex} onKeyDown={onHideCart} role="button" aria-label="CloseCart" />
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
      {portalElement && ReactDOM.createPortal(<Backdrop onHideCart={onHideCart} />, portalElement)}
      {portalElement && ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
}

export default Modal;
