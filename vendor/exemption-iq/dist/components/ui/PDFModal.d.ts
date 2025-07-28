import React from 'react';

interface PDFModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title?: string;
}
declare function PDFModal({ isOpen, onClose, pdfUrl, title, }: PDFModalProps): React.JSX.Element;

export { PDFModal as default };
