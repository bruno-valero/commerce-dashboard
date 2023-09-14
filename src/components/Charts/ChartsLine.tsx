'use client'

import { ReactNode } from 'react';

interface ChartsLineProps {
  children: ReactNode
}

export default function ChartsLine({ children }:ChartsLineProps) {
  return (
    <>
      {children}
    </>
  );
};
