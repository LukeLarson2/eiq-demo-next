import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
declare function Modal({ isOpen, onClose, children }: ModalProps): React.ReactPortal | null;

export { Modal as default };
