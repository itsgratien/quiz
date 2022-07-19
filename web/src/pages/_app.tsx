import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@/utils/Firebase';
import { Toaster } from 'react-hot-toast';
import apolloClient from '@/utils/ApolloClient';
import { ApolloProvider } from '@apollo/client';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            style: { fontSize: '14px', borderRadius: '5px', padding: '15px' },
            error: { style: { background: '#FF001F', color: 'white' } },
            success: { style: { background: '#B3FF77', color: 'black' } },
          }}
        />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
