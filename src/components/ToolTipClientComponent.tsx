'use client'

import { TooltipComponent, TooltipModel } from '@syncfusion/ej2-react-popups';
import { ReactNode } from 'react';

interface ToolTipClientComponentChildren {
  children: ReactNode;
  className?:string;
};
type ToolTipClientComponentProps = ToolTipClientComponentChildren & TooltipModel;


export default function ToolTipClientComponent({ children, ...props }:ToolTipClientComponentProps) {

  return (
    <TooltipComponent {...props} >
      {children}
    </TooltipComponent>
  );
};
