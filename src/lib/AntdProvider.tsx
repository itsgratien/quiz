'use client';
import React from 'react';
import { ConfigProvider } from 'antd';
import AntdRegistry from './AntdRegistry';
import { Color } from '@/utils/Color';

interface AntdProviderProps {
  children: React.ReactNode;
}
const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 14,
            colorPrimary: Color.Primary,
            fontFamily: '"Quicksand", sans-serif',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};
export default AntdProvider;
