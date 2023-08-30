import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';

const useSetup = () => React.useContext(SetupContext);
export default useSetup;
