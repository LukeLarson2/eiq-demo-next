import React from 'react';
import { ExemptionIqProps } from '../server/types/types.d.js';

declare function ExemptionIqCustomerServer({ customerCode, customerInfo, state, showDownload, manualValidation, enableGenCertModal, buttonText, buttonTextColor, primaryColor, dangerColor, successColor, buttonStyles, onComplete, avataxBaseUrl, environment, }: ExemptionIqProps): Promise<React.JSX.Element>;

export { ExemptionIqCustomerServer };
