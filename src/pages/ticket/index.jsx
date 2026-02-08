import { useEffect } from 'react';
import { TbSearch, TbEaseInOutControlPoints  } from 'react-icons/tb';
import { useUserStore } from '@/state/user';
import { Input } from 'antd';
import { courtList } from '@/mock/court';
import CourtCard from '@/components/molecules/Court';
import { useOrderStore } from '@/state/order';

const index = () => {
  const { user } = useUserStore();
  const { clearOrder } = useOrderStore();

  useEffect(() => {
    clearOrder();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-emerald-700 w-full p-3 rounded-b-3xl bg-contain">
        <p className="text-white uppercase font-medium">Đăng ký vãng lai</p>
        <div className="mt-3 flex">
          <Input
            className="h-10 rounded-l-xl rounded-none"
            placeholder="Nhập tên sân, địa chỉ,..."
          />
          <div className="bg-white bg-opacity-85 h-10 px-3 flex items-center">
            <TbSearch size={24} className=" text-emerald-700"/>
          </div>
          <div className="bg-white bg-opacity-85 h-10 px-3 rounded-r-xl flex items-center">
            <TbEaseInOutControlPoints size={24} className=" text-emerald-700"/>
          </div>
        </div>
      </div>
      <div className="w-full space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto mt-2 px-3">
        {
          courtList.map((court, index) => (
            <CourtCard key={index} court={court} ticket/>
          ))
        }
      </div>
    </div>
  );
};

export default index;