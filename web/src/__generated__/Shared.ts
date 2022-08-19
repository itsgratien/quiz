import React from 'react';

export interface TLayoutProps {
  children: React.ReactNode;
}

export interface TListItemProps {
  name: string;
  icon: string;
}

export interface CustomModalPropsT {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
