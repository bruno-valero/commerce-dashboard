'use client'

import { ReactNode } from 'react';

interface ChartsRootProps {
  children: ReactNode
}

export default function ChartsRoot({ children }:ChartsRootProps) {
  return (
    <>
      {children}
    </>
  );
};
