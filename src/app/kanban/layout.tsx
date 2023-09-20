import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calendário',
  description: 'Veja os compromissos marcados',
}

interface OrdersLayoutProps {
  children: ReactNode
}

export default async function OrdersLayout({ children }:OrdersLayoutProps) {
  return (
    <>
      {children}
    </>
  );
};
