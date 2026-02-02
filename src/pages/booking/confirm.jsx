import { TbChevronLeft, TbMap, TbCalendar } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderStore } from '@/state/order';

const confirm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, court } = useOrderStore();

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center gap-4 px-3 py-2 bg-emerald-700">
        <TbChevronLeft
          size={28}
          className="text-white cursor-pointer"
          onClick={() => navigate(`/booking/${id}`, { replace: true })}
        />
        <p className="text-white text-center font-semibold text-base">Xác nhận đặt lịch</p>
        <div className="w-6"></div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-base font-semibold flex items-center gap-2"><TbMap size={20}/> Thông tin sân</span>
        <div className="flex flex-col bg-white bg-opacity-80 rounded-xl p-3 shadow-lg text-secondary text-sm gap-2">
          <span className="font-semibold">{court.name}</span>
          <span>{court.address}</span>
        </div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-base font-semibold flex items-center gap-2"><TbCalendar size={20}/>Thông tin lịch đặt</span>
        <div className="flex flex-col bg-white bg-opacity-90 rounded-xl p-3 shadow-lg text-secondary text-base gap-2">
          <span>Tên sân: <strong>{court.name}</strong></span>
          <span>Địa chỉ: <strong>{court.address}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default confirm;