import React from 'react';
import { AvataxCertificateClientProps } from '../server/types/types.d.js';

declare function AvataxCertificateClient({ token, state, showDownload, manualValidation, onCertificateComplete, onClose, customerInfo, shouldPrefillState, mode, onComplete, customerCode, environment, }: AvataxCertificateClientProps): React.JSX.Element;

export { AvataxCertificateClient as default };
