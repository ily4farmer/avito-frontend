import { App as AntdApp, ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { AppStyles } from '../../AppStyles';

export const AppAntdProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider theme={AppStyles}>
    <AntdApp style={{ display: 'block', minWidth: '100%', minHeight: '100vh' }}>{children}</AntdApp>
  </ConfigProvider>
);
