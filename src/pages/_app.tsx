import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import AppProvider from '@/lib/AppProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          style: { fontSize: '14px', borderRadius: '5px', padding: '15px' },
          error: { style: { background: '#FF001F', color: 'white' } },
          success: { style: { background: '#B3FF77', color: 'black' } },
        }}
      />
    </AppProvider>
  );
};

export default MyApp;
