import React from 'react';
import { ExemptionIqProps } from '../server/types/types.d.js';

declare function ExemptionIqCustomerClient({ customerCode, customerInfo, state, showDownload, manualValidation, enableGenCertModal, buttonText, buttonTextColor, primaryColor, dangerColor, successColor, buttonStyles, onComplete, framework, environment, }: ExemptionIqProps): React.JSX.Element;

export { ExemptionIqCustomerClient };
