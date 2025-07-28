import React from 'react';
import { ExemptionIqTableProps } from '../server/types/types.d.js';

declare function ExemptionIqCertificateTable({ token, sessionToken, certificates: initialCertificates, customer, state, showDownload, manualValidation, buttonText, buttonTextColor, primaryColor, successColor, dangerColor, buttonStyles, onComplete, framework, environment, }: ExemptionIqTableProps): React.JSX.Element;

export { ExemptionIqCertificateTable as default };
