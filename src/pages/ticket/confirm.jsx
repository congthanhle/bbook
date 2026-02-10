import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import { TbChevronLeft, TbMap, TbClockHour4, TbUsers, TbMinus, TbPlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { ticketItem } from '@/mock/ticket';
import { FORMAT_DATE } from '@/utils/format';

const { TextArea } = Input;

const confirm = () => {
  const navigate = useNavigate();
  const [numSlots, setNumSlots] = useState(1);
  const [note, setNote] = useState('');
  const { id } = useParams();

  const handleDecrement = () => {
    if (numSlots > 1) {
      setNumSlots(numSlots - 1);
    }
  };

  const handleIncrement = () => {
    const maxSlots = ticketItem.slots - ticketItem.registerd;
    if (numSlots < maxSlots) {
      setNumSlots(numSlots + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxSlots = ticketItem.slots - ticketItem.registerd;
    if (value >= 1 && value <= maxSlots) {
      setNumSlots(value);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center gap-4 px-3 py-4 bg-emerald-700">
        <TbChevronLeft
          size={28}
          className="text-white cursor-pointer"
          onClick={() => navigate('/ticket', { replace: true })}
        />
        <span className="text-white text-center font-semibold text-base">Đăng ký vãng lai</span>
        <div className="w-6"></div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-sm flex items-center gap-1"><TbMap size={18} /> Thông tin sân</span>
        <div className="flex flex-col bg-white rounded-xl p-3 shadow-lg text-secondary gap-2">
          <span className="font-semibold">{ticketItem.courtInfo.name}</span>
          <span className="text-sm">{ticketItem.courtInfo.address}</span>
        </div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-sm flex items-center gap-1"><TbMap size={18} /> Thông tin đăng ký</span>
        <div className="flex flex-col bg-white rounded-xl p-3 text-secondary space-y-2">
          <span className="font-semibold">{ticketItem.name}</span>
          <span className="flex items-center gap-1"><TbClockHour4 size={18} />{ticketItem.time} | {FORMAT_DATE(ticketItem.date)}</span>
          <span>Sân: {ticketItem.court.join(', ')}</span>
          <span>Ghi chú: {ticketItem.note}</span>
        </div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-sm flex items-center gap-1"><TbUsers size={18} /> Số lượng đăng ký</span>
        <div className="flex flex-col bg-gray-50 rounded-xl p-3 text-secondary">
          <div className="grid grid-cols-2 gap-2 items-center">
            <span className="text-nowrap">Số lượng tham gia</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                disabled={numSlots <= 1}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <TbMinus size={20} />
              </button>
              <Input
                value={numSlots}
                onChange={handleInputChange}
                className="flex-1 text-center text-lg font-semibold !h-8"
                size="large"
                readOnly
              />
              <button
                onClick={handleIncrement}
                disabled={numSlots >= ticketItem.slots - ticketItem.registerd}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <TbPlus size={20} />
              </button>
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-2">
            Tối đa: {ticketItem.slots - ticketItem.registerd} người
          </span>
        </div>
        <TextArea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ghi chú"
          rows={3}
          className="mt-3"
        />
      </div>
      <div className="px-3 py-4 mt-auto">
        <button
          onClick={() => navigate(`/booking-ticket/checkout/${id}`)}
          className="w-full bg-yellow-400 hover:bg-emerald-800 text-secondary font-semibold py-3 px-6 rounded-xl shadow-lg transition-colors uppercase"
        >
          Xác nhận & Thanh toán
        </button>
      </div>
    </div>
  );
};
export default confirm;