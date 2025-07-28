import React from 'react';
import { ExemptionIqGenCertModalProps } from '../server/types/types.d.js';

declare function ExemptionIqGenCertModal({ isOpen, onClose, token, state, customerCode, customerInfo, disableCustomerFields, showDownload, manualValidation, onCertificateComplete, mode, onComplete, environment, }: ExemptionIqGenCertModalProps): React.JSX.Element;

export { ExemptionIqGenCertModal as default };
