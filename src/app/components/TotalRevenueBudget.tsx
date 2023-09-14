'use client'


interface TotalRevenueBudgetProps {
  maskedBudget:string;
  profitMargin:string;  
}

export default function TotalRevenueBudget({ maskedBudget, profitMargin }:TotalRevenueBudgetProps) {

  const labelColor:string = Number(profitMargin) > 0 ? 'text-gray-500' : 'text-red-500';
  const percentColor:string = Number(profitMargin) > 0 ? 'bg-green-400' : 'bg-red-400'
  
  return (
    <div className=''>
      <p className='flex align-center'>
        <span className='text-3xl font-semibold'>
          ${maskedBudget}
        </span>
        <span className={`p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white ${percentColor} ml-3 text-xs my-auto`}>
          {profitMargin}%
        </span>
      </p>
      <p className={`${labelColor} mt-1`}>
        Receita
      </p>
    </div>
  );
};
