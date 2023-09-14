'use client'

import Charts from '@/components/Charts/index';
import { useGlobalState } from '@/contexts/GlobalContext';
import relativeProfitMargin from '@/utils/finances/relativeProfitMargin';
import { ReactNode } from 'react';

interface SparkLineRevenueChartProps {
  children?: ReactNode
}

export default function SparkLineRevenueChart({ children }:SparkLineRevenueChartProps) {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const revenueReport = globalData.finances.revenueReport;
  
  const incomes = revenueReport.budget.map(month => month.y);
  const expenses = revenueReport.expense.map(month => month.y);
  const profitMargin = relativeProfitMargin({ incomes, expenses }).map(val => val * 100);
  const data = revenueReport.budget.map((month, i) => ({x:i + 1, xval: month.x, yval:Number(profitMargin[i].toFixed(2))}))

  // alert(JSON.stringify(data));

  return (
    <div className="mt-5">
      <Charts.SparkLine 
      currentColor='green' 
      id='line-sparkline'
      type='Line'
      height='80px'
      width='250px'
      data={data}
      color='rgba(100,200,100,.8)'
      />
    </div>
  );
};
