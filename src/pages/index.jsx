import { getGreeting } from '@/utils';
import { TbSearch, TbEaseInOutControlPoints  } from 'react-icons/tb';
import { useUserStore } from '@/state/user';
import starBg from '@/assets/img/background/home.png';
import { Input } from 'antd';
import { courtList } from '@/mock/court';
import CourtCard from '@/components/molecules/Court';

const index = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col items-center">
      <div className="bg-emerald-700 w-full p-3 rounded-b-3xl bg-contain" style={{ backgroundImage: `url(${starBg})` }}>
        <div className="flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/128/2112/2112223.png" className="w-14 h-14 rounded-xl bg-white" />
          <div className="text-white space-y-1 flex flex-col">
            <span className="text-base">{getGreeting()}</span>
            <span className="text-lg">{user?.name}</span>
          </div>
        </div>
        <div className="mt-3 flex">
          <Input
            className="h-10 rounded-l-xl rounded-none"
            placeholder="Nhập tên sân, địa chỉ,..."
          />
          <div className="bg-white bg-opacity-80 h-10 px-3 flex items-center">
            <TbSearch size={24} className=" text-emerald-700"/>
          </div>
          <div className="bg-white bg-opacity-80 h-10 px-3 rounded-r-xl flex items-center">
            <TbEaseInOutControlPoints size={24} className=" text-emerald-700"/>
          </div>
        </div>
        <div className='flex mt-2 text-sm gap-3'>
          <div className="bg-white bg-opacity-80 text-sm border rounded-lg text-secondary px-3 py-1">
            Sân gần tôi
          </div>
          <div className="bg-white bg-opacity-80 text-sm border rounded-lg text-secondary px-3 py-1">
            Vé xé gần tôi
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto mt-2">
        {
          courtList.map((court, index) => (
            <CourtCard key={index} court={court} />
          ))
        }
      </div>
    </div>
  );
};

export default index;