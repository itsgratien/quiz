import 'src/styles/globals.css';
import { Metadata } from 'next';
import AppProvider from '@/lib/AppProvider';

export const metadata: Metadata = {
  title: 'equiz',
  description: 'Online Testing Platform',
  authors: [{ name: 'Gratien Tuyishimire' }],
  icons: '/logo.png',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
