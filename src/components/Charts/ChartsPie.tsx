'use client'

import { ReactNode } from 'react';

interface ChartsPieProps {
  children: ReactNode
}

export default function ChartsPie({ children }:ChartsPieProps) {
  return (
    <>
      {children}
    </>
  );
};
