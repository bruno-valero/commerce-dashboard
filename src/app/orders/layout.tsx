import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pedidos',
  description: 'Confira todos os pedidos',
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
