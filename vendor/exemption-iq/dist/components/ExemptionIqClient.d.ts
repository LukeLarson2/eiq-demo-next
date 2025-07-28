import React from 'react';
import { ExemptionIqProps } from '../server/types/types.d.js';

declare function ExemptionIqClient({ customerCode, customerInfo, state, showDownload, manualValidation, buttonText, buttonTextColor, primaryColor, dangerColor, successColor, buttonStyles, onComplete, framework, environment, }: ExemptionIqProps): React.JSX.Element;

export { ExemptionIqClient };
