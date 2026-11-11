import { App as AntdApp, ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { nordicSlateTheme } from '../../ui';

export const AppAntdProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider theme={nordicSlateTheme}>
    <AntdApp style={{ display: 'block', minWidth: '100%', minHeight: '100vh' }}>{children}</AntdApp>
  </ConfigProvider>
);
