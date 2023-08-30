import React from 'react';

const withAuth = <W,>(WrappedComponent: React.ComponentType<W>) => {
  const Wrapper = (props: W) => {
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
