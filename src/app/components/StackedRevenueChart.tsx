'use client'

import Charts from '@/components/Charts/index';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { ReactNode, useMemo } from 'react';
import makeStackedRevenueAxis from '../functions/makeStackedRevenueAxis';
import makeStackedRevenueData from '../functions/makeStackedRevenueData';

interface StackedRevenueChartProps {
  children?: ReactNode
}

export default function StackedRevenueChart({ children }:StackedRevenueChartProps) {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const revenueReport = globalData.finances.revenueReport;
  const stackedRevenueData = makeStackedRevenueData({ revenueReport });
  const axis = useMemo(() => {
    return makeStackedRevenueAxis({ revenueReport, maxPercent: .01 })
  }, [globalData.finances.revenueReport]);
  return (
    <div className="">
      <Charts.Stacked 
      width='320px' 
      height='360px' 
      id={'stacked-chart'} 
      primaryXAxis={axis.xAxis}
      primaryYAxis={axis.yAxis}
      chartArea={{border: {width: 0}}}
      data={stackedRevenueData}
      />
    </div>
  );
};
