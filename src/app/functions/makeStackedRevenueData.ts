import { RevenueReport, StackedCustomSeriesType } from '@/common.types';

/**
 * Esta é uma função que gera o modelo de dados para criar um Gráfico de Barras Empilhado.
 * 
 * Ela gera o modelo para Receita, e o modelo para Despesas através do relatório financeiro do negócio.
 * 
 * @param {RevenueReport} revenueReport - Relatório de Receita -> são os dados usados para criar o gráfico.
 * @param {string} budgetColor - A cor atribuída aos valores de Receita ou Orçamento.
 * @param {string} expenseColor - A cor atribuída aos valores de Despesas.
 * @returns {StackedCustomSeriesType} - Um array de Séries (SeriesModel) do @syncfusion/ej2-react-charts.
 */

export default function makeStackedRevenueData({ revenueReport, budgetColor, expenseColor }:MakeStackedRevenueDataPropsType):StackedCustomSeriesType {
  return [

    { dataSource: revenueReport['budget'],
      xName: 'x',
      yName: 'y',
      name: 'Receita',
      type: 'StackingColumn',
      fill: budgetColor ?? 'rgba(10,150,40,.9)',      
    },
  
    { dataSource: revenueReport['expense'],
      xName: 'x',
      yName: 'y',
      name: 'Despesa',
      type: 'StackingColumn',
      fill: expenseColor ?? 'rgba(150,10,10,.8)',  
    },
    
  ];
};

export type MakeStackedRevenueDataPropsType = {
  revenueReport: RevenueReport,
  budgetColor?: string, 
  expenseColor?: string,
}

export type MakeStackedRevenueDataType = (props:MakeStackedRevenueDataPropsType) => StackedCustomSeriesType