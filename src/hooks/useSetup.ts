import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';

export const useSetup = () => React.useContext(SetupContext);
export default useSetup;
