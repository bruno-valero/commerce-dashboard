import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import EarningItem from './EaringItem';



interface EaringDataProps {
  className?:string
}

export default function EaringData({ className }:EaringDataProps) {

  return (
    <div className={twMerge('flex m-3 flex-wrap justify-center gap-1 items-center', className ?? '')}>
      <EarningItem type={'Customers'} icon={<MdOutlineSupervisorAccount />} iconColor='#03C9D7' iconBg='#E5FAFB' />
      <EarningItem type={'Products'} icon={<BsBoxSeam />} iconColor='rgb(255, 244, 229)' iconBg='rgb(254, 201, 15)' />
      <EarningItem type={'Sales'} icon={<FiBarChart />} iconColor='rgb(228, 106, 118)' iconBg='rgb(255, 244, 229)' />
      <EarningItem type={'Refunds'} icon={<HiOutlineRefresh />} iconColor='rgb(0, 194, 146)' iconBg='rgb(235, 250, 242)' />
    </div>
  );
};
