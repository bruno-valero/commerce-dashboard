'use client'


import { SparklineAreaDataType } from '@/common.types';
import { Inject, SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-react-charts';

interface ChartsSparkLineProps {
  currentColor: string;
  id: string;
  type: "Line" | "Column" | "WinLoss" | "Pie" | "Area" | undefined;
  height: string;
  width: string;
  data: SparklineAreaDataType;
  color: string;
}

export default function ChartsSparkLine({ currentColor, id, type, height, width, data, color }:ChartsSparkLineProps) {
  return (
    <SparklineComponent
    id={id}
    height={height}
    width={width}
    lineWidth={1}
    valueType='Category'
    fill={color}
    border={{ color: currentColor, width: 3 }}
    dataSource={data}
    axisSettings={{
      minY: -100, maxY: 100, minX:-1, maxX:13,
      lineSettings: {
        color: color,
      }
    }}
    xName='xval'
    yName='yval'
    type={type}
    
    tooltipSettings={{
      visible: true,
      format: '${xval} [%Lucro]: ${yval}%',
      trackLineSettings: { visible: true }
    }}
    markerSettings={{visible: ['All'], fill: 'rgba(120,180,120,.8)' }}
    > 

    <Inject services={[SparklineTooltip]} />
    {/* <p>{color}</p> */}

    </SparklineComponent>
  );
};
