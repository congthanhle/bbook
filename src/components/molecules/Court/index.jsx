import { TbHeart, TbMapPin2, TbClock, TbInfoOctagon } from 'react-icons/tb';
import InfoSheet from '@/components/molecules/Court/Sheet';
import TicketSheet from '@/components/molecules/Court/Ticket';
import { useSheetStore } from '@/state/sheet';
import { useNavigate } from 'react-router-dom';

const index = ({ court, ticket = false }) => {
  const navigate = useNavigate();
  const { openSheet } = useSheetStore();

  const handleShowInfo = () => {
    openSheet({
      children: <InfoSheet />,
    });
  };

  const handleNavigate = () => {
    if (ticket){
      openSheet({
        children: <TicketSheet />,
      });
      return;
    }
    navigate(`/booking/${court.id}`);
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
      <div className="p-2 gap-2 flex flex-col">
        <span className="font-semibold text-md">{court?.name}</span>
        <span className="text-xs">{court?.address}</span>
        <div className='flex justify-between items-start'>
          <div className="flex items-center text-sm gap-1">
            <TbClock size={16}/>
            <span className="text-xs">{court?.openHours}</span>
          </div>
          <button
            className="text-md font-semibold text-nowrap px-4 py-2 text-xs uppercase bg-yellow-400 rounded-md"
            onClick={handleNavigate}
          >
            {ticket ? 'Đăng ký vãng lai' : 'Đặt sân'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;