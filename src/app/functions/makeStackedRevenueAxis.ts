import { RevenueReport, StackedCustomSeriesType } from '@/common.types';
import standardDeviationArray from '@/utils/math/standardDeviationArray';
import { AxisModel } from '@syncfusion/ej2-react-charts/index';

/**
 * Esta é uma função que gera os eixos e o layout do Gráfico de Barras Empilhado.
 * 
 * @param {RevenueReport} revenueReport - Relatório de Receita -> são os dados usados para criar o gráfico.
 * @param {number} maxPercent - A porcentagem adicionada a mais ou a menos na escala do eixo y do gráfico.
 * @returns {makeStackedRevenueAxisReturnType} - Um objeto com dois eixos "xAxis" e "yAxis" (AxisModel) do @syncfusion/ej2-react-charts.
 */

export default function makeStackedRevenueAxis({ revenueReport, maxPercent }:makeStackedRevenueAxisPropsType):makeStackedRevenueAxisReturnType {
  const budget = revenueReport.budget.map(data => data.y);
  const expense = revenueReport.expense.map(data => data.y);
  const values = [...budget, ...expense];

  const standartDeviation = standardDeviationArray({arr: values});

  const interval = Math.ceil(standartDeviation);
  const maxSum = Math.max(...budget) + Math.max(...expense);
  const percent = maxPercent ?? .05
  const aditional = percent >= 0 ? (maxSum * percent): ((maxSum * Math.abs(percent)) * -1)
  const maximum = maxSum + aditional;

  return {
    xAxis: {
      majorGridLines: { width: 0 },
      minorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      interval: 1,
      lineStyle: { width: 0 },
      labelIntersectAction: 'Rotate45',
      valueType: 'Category',
    },

    yAxis: {
      lineStyle: { width: 0 },
      minimum: 0,
      maximum,
      interval,
      majorTickLines: { width: 0 },
      majorGridLines: { width: 0.5 },
      minorGridLines: { width: 0.5 },
      minorTickLines: { width: 0 },
      labelFormat: 'R$ {value},00',
    },
  }
};

export type makeStackedRevenueAxisPropsType = {
  revenueReport: RevenueReport,
  maxPercent?:number
}

export type makeStackedRevenueAxisReturnType = {
  xAxis: AxisModel,
  yAxis: AxisModel,
}

export type makeStackedRevenueAxisType = (props:makeStackedRevenueAxisPropsType) => StackedCustomSeriesType