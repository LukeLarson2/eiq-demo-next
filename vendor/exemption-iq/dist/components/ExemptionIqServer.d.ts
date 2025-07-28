import React from 'react';
import { ExemptionIqProps } from '../server/types/types.d.js';

declare function ExemptionIqServer(props: ExemptionIqProps): Promise<React.JSX.Element>;

export { ExemptionIqServer };
