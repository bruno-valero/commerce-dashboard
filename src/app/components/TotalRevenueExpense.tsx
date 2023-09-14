'use client'


interface TotalRevenueExpenseProps {
  maskedExpense: string
}

export default function TotalRevenueExpense({ maskedExpense }:TotalRevenueExpenseProps) {
  
  return (
    <div className='mt-8'>
      <p className='flex align-center'>
        <span className='text-3xl font-semibold'>
          ${maskedExpense}
        </span>
      </p>
      <p className='text-gray-500 mt-1'>
        Gastos
      </p>
    </div>
  );
};
