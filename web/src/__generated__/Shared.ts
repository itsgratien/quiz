import React from 'react';
import { Test } from '@/generated/graphql';

export interface LayoutProps {
  children: React.ReactNode;
  goBack?: boolean;
  setup?: boolean;
  edit?: () => void;
}

export interface SetupProps {
  open: boolean;
  handleClose?: () => void;
  slug?: string;
  loading?: boolean;
}
