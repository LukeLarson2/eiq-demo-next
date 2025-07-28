import React from 'react';
import { AddCertificateProps } from '../server/types/types.d.js';

declare function ExemptionIqAddCertificateButton({ token, state, customerCode, customerInfo, buttonText, buttonTextColor, primaryColor, buttonStyles, showDownload, manualValidation, certificateComplete, onComplete, environment, }: AddCertificateProps): React.JSX.Element;

export { ExemptionIqAddCertificateButton as default };
