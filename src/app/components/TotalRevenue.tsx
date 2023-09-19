'use client'

import { RevenueReportItem } from '@/common.types';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { ReactNode, useMemo } from 'react';
import TotalRevenueBudget from './TotalRevenueBudget';
import TotalRevenueExpense from './TotalRevenueExpense';

interface TotalRevenueProps {
  children?: ReactNode
}

export default function TotalRevenue({ children }:TotalRevenueProps) {

  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const revenueReport = globalData.finances.revenueReport;
  
  const budget:number = useMemo<number>(():number => {
    const total = revenueReport.budget.reduce((acc:number, val:RevenueReportItem):number => {
      acc += val.y;
      return acc;
    }, 0);
    return total;

  }, [globalData.finances.revenueReport]); 

  const expense:number = useMemo<number>(():number => {
    const total = revenueReport.expense.reduce((acc:number, val:RevenueReportItem):number => {
      acc += val.y;
      return acc;
    }, 0);
    return total;

  }, [globalData.finances.revenueReport]); 

  const profitMargin:string = (((budget - expense) / budget) * 100).toFixed(2);
  
  const maskedBudget:string = budget.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 });
  const maskedExpense:string = expense.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 });

  return (
    <>
      <TotalRevenueBudget maskedBudget={maskedBudget} profitMargin={profitMargin} />
      <TotalRevenueExpense maskedExpense={maskedExpense} />
    </>
  );
};
