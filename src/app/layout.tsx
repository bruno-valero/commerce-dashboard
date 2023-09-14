import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Menu from '@/components/Menu/index';
import ToolTipClientComponent from '@/components/ToolTipClientComponent';
import GlobalProvider from '@/contexts/providers/GlobalProvider';
import { ReactNode } from 'react';
import { FiSettings } from 'react-icons/fi';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Visão geral do negócio',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }:RootLayoutProps) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider syncfusionRegisterLicence={process.env.SYNCFUSION_REGISTER_LICENCE}>
          <main className="flex relative dark:bg-blue-950 min-h-[100vh]">
            <div className="fixed right-4 bottom-4 z-50">
                <ToolTipClientComponent content='Opções' position='TopCenter' >
                  <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-gray-300 text-white bg-blue-500 rounded-[50%]'>
                    <FiSettings />
                  </button>
                </ToolTipClientComponent>
            </div>
            
            <Menu>
              {children}
            </Menu>
                        
          </main>        
        </GlobalProvider>
      </body>
    </html>
  )
}
