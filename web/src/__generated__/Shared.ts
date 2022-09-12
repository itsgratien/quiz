import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  goBack?: boolean;
}

export interface SetupProps {
  open: boolean;
  handleClose?: () => void;
  slug?: string;
}
