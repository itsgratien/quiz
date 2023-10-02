import React from 'react';

export const useSSR = () => {
  const [isSSR, setIsSSR] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR;
};
