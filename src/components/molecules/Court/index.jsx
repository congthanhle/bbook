import { TbHeart, TbMapPin2, TbClock, TbInfoOctagon } from 'react-icons/tb';
import Sheet from '@/components/molecules/Court/Sheet';
import { useSheetStore } from '@/state/sheet';
import { useNavigate } from 'react-router-dom';

const index = ({ court }) => {
  const navigate = useNavigate();
  const { openSheet } = useSheetStore();

  const handleShowInfo = () => {
    openSheet({
      children: <Sheet />,
    });
  };

  return (
    <div className="shadow-md text-secondary bg-white bg-opacity-90 rounded-xl">
      <div className="max-h-28 min-h-28 overflow-hidden rounded-b-xl relative">
        <img src={court?.thumbnail} className="w-full rounded-xl"/>
        <img src={court?.logo} className="w-10 h-10 bg-white absolute top-2 left-2 rounded-lg"/>
        <div className="absolute top-2 right-2 flex gap-2 items-center">
          <div className="bg-white p-1 rounded-full" onClick={ () => handleShowInfo()}>
            <TbInfoOctagon size={24}/>
          </div>
          <div className="bg-white p-1 rounded-full">
            <TbMapPin2 size={24}/>
          </div>
          <div className="bg-white p-1 rounded-full">
            <TbHeart size={24}/>
          </div>
        </div>
      </div>
      <div className="space-y-1 p-2 gap-2">
        <p className="font-semibold text-md">{court?.name}</p>
        <p className="text-xs">{court?.address}</p>
        <div className='flex justify-between items-center mt-2'>
          <div className="flex items-center text-sm gap-1">
            <TbClock size={16}/>
            <span className="text-xs">{court?.openHours}</span>
          </div>
          <button
            className="text-md font-semibold text-nowrap px-4 py-1 text-xs uppercase bg-yellow-400 rounded-md"
            onClick={() => navigate(`/booking/${court.id}`)}
          >
            Đặt lịch
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;