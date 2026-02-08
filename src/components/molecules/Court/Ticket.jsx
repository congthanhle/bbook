import { Tag } from 'antd';
import { ticketList } from '@/mock/ticket';
import { FORMAT_DATE, FORMAT_CURRENCY } from '@/utils/format';
import { useNavigate } from 'react-router-dom';
import { useSheetStore } from '@/state/sheet';

const Ticket = () => {
  const navigate = useNavigate();
  const { closeSheet } = useSheetStore();

  const handleRegister = (ticketId) => {
    closeSheet();
    navigate(`/booking-ticket/${ticketId}`);
  };

  return (
    <div className=" bg-white rounded-t-3xl">
      <div className="px-3 py-2 bg-emerald-700 rounded-t-2xl w-full flex justify-center">
        <span className="text-base text-white font-semibold text-center">
          Danh sách vé vãng lai: 16/06/2026
        </span>
      </div>
      <div className="px-3 py-4 max-h-[calc(100vh-100px)] overflow-y-auto">
        {
          ticketList.map((ticket, index) => (
            <div key={index} className="border-b pb-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-black">{ticket.name}</span>
                <span className="text-black text-xs">{ticket.code}</span>
              </div>
              <div className="text-sm text-secondary flex justify-between">
                <p>Sân: {ticket.court.join(', ')}</p>
                <p>{ticket.time}</p>
              </div>
              <div className="w-full flex justify-center">
                <Tag color="gold" variant='outlined' className='text-sm px-3 py-1 rounded-xl'>
                  {FORMAT_CURRENCY(ticket.price)} / vé
                </Tag>
              </div>
              <p className="text-sm text-secondary mt-2">Ghi chú: {ticket.note}</p>
              <div className="flex justify-between mt-2">
                <div className='space-x-1'>
                  <span className="text-sm text-secondary">Còn lại:</span>
                  <Tag color="blue" className="text-sm">{ticket.slots - ticket.registerd} / {ticket.slots}</Tag>
                </div>
                <button
                  onClick={() => handleRegister(ticket.id)}
                  className="ml-4 bg-emerald-700 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
};

export default Ticket;