import React from 'react';
import { Test } from '@/generated/graphql';

export interface LayoutProps {
  children: React.ReactNode;
  goBack?: boolean;
  showSetupButton?: boolean;
}

export interface SetupProps {
  open: boolean;
  handleClose?: () => void;
  slug?: string;
  loading?: boolean;
}
