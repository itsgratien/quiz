import 'src/styles/globals.css';
import '@/utils/Firebase';
import { Metadata } from 'next';
import AntdProvider from '@/lib/AntdProvider';
import ApolloGraphQLProvider from '@/lib/ApolloGraphQLProvider';

export const metadata: Metadata = {
  title: 'equiz',
  description: 'Online test platform',
  authors: [{ name: 'Gratien Tuyishimire' }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ApolloGraphQLProvider>
          <AntdProvider>{children}</AntdProvider>
        </ApolloGraphQLProvider>
      </body>
    </html>
  );
};

export default RootLayout;
