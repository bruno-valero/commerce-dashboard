'use client'

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { ReactNode } from 'react';

interface ToolTipClientComponentChildren {
  children: ReactNode;
};
type ToolTipClientComponentProps = ToolTipClientComponentChildren | Record<string, string | number>;


export default function ToolTipClientComponent({ children, ...props }:ToolTipClientComponentProps) {
  return (
    <TooltipComponent {...props} >
      {children}
    </TooltipComponent>
  );
};
