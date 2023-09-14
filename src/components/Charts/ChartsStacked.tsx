'use client'

import { StackedCustomSeriesType } from '@/common.types';
import { AxisModel, Category, ChartAreaModel, ChartComponent, DataLabel, Inject, Legend, SeriesCollectionDirective, SeriesDirective, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

interface ChartsStackedProps {
  width: string;
  height: string;
  id: string;
  primaryXAxis?: AxisModel;
  primaryYAxis?: AxisModel;
  chartArea?: ChartAreaModel;
  data: StackedCustomSeriesType;
}

export default function ChartsStacked({ width, height, id, primaryXAxis, primaryYAxis, chartArea, data }:ChartsStackedProps) {
  return (
    <ChartComponent
    width={width}
    height={height}
    id={id}
    primaryXAxis={primaryXAxis}
    primaryYAxis={primaryYAxis}
    chartArea={chartArea}
    tooltip={{enable:true}}
    legendSettings={{background: 'white'}}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip, DataLabel]} />
      <SeriesCollectionDirective>
        {data.map((item, i) => (
          <SeriesDirective key={i + 1} {...item}  />
        ))}
      </SeriesCollectionDirective>      
    </ChartComponent>
  );
};
