import React from 'react';
import { ExemptionIqButtonProps } from '../server/types/types.d.js';

declare function ExemptionIqButton({ token, sessionToken, isAuthorized, state, showDownload, manualValidation, buttonText, buttonTextColor, primaryColor, dangerColor, successColor, buttonStyles, customerCode, customerInfo, onComplete, persistAfterSuccess, matchingCertificate, framework, environment, }: ExemptionIqButtonProps): React.JSX.Element;

export { ExemptionIqButton as default };
