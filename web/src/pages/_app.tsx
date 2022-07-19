import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@/utils/Firebase';
import { Toaster } from 'react-hot-toast';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          style: { fontSize: '14px', borderRadius: '5px', padding: '15px' },
          error: { style: { background: '#FF001F', color: 'white' } },
          success: { style: { background: '#B3FF77', color: 'black' } },
        }}
      />
    </>
  );
};

export default MyApp;
