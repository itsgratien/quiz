import React from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

const withAuth = <W,>(WrappedComponent: React.ComponentType<W>) => {
  const Wrapper = (props: W) => {
    const router = useRouter();

    return (
      <AuthContext.Consumer>
        {({ isAuth }) => {
          if (typeof isAuth === 'boolean') {
            if (isAuth === false) {
              return null;
            }
            return <WrappedComponent {...props} />;
          }
        }}
      </AuthContext.Consumer>
    );
  };

  return Wrapper;
};

export default withAuth;
