import { QRCode } from 'antd';
import { TbChevronLeft, TbUser, TbCode, TbCheckupList, TbReportMoney } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderStore } from '@/state/order';
import { FORMAT_CURRENCY } from '@/utils/format';
import { formatTime } from '@/utils/datetime';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const checkout = () => {
  const navigate = useNavigate();
  const { order } = useOrderStore();
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center gap-4 px-3 py-4 bg-emerald-700">
        <TbChevronLeft
          size={28}
          className="text-white cursor-pointer"
          onClick={() => navigate('/', { replace: true })}
        />
        <span className="text-white text-center font-semibold text-base">Thanh toán</span>
        <div className="w-6"></div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <div className="flex flex-col bg-white rounded-xl p-3 shadow-lg text-secondary gap-2">
          <span className="font-semibold text-black">Thông tin lịch đặt</span>
          <span className=" flex text-sm items-start gap-2">
            <TbUser size={18} />
            <span className='text-nowrap'>Khách hàng:</span>
            <strong>Cong Thanh Le - 0392333699</strong></span>
          <span className=" flex text-sm items-center gap-2"><TbCode size={18} /> Mã đơn: <strong>#5349</strong></span>
          <div className=" flex text-sm items-start gap-2">
            <TbCheckupList size={18} className="mt-0.5" />
            <div className="flex-1">
              <span>Chi tiết:</span>
              {order?.bookingsByDate && (
                <div className="mt-2 space-y-3">
                  {Object.entries(order.bookingsByDate).map(([date, bookings]) => (
                    <div key={date} className="space-y-1">
                      <div className="font-bold text-sm">
                        {dayjs(date).format('DD/MM/YYYY')}
                      </div>
                      {bookings.map((booking, index) => (
                        <div key={index} className="pl-3 text-sm">
                          - {booking.court}: {booking.time}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span className=" flex text-sm items-center gap-2"><TbReportMoney size={18} /> Tổng tiền: <strong>{FORMAT_CURRENCY(order?.totalPrice || 0)}</strong></span>
        </div>
        <div className="flex flex-col bg-white rounded-xl p-3 shadow-lg text-secondary gap-2">
          <span className="font-semibold text-black">Thông tin thanh toán</span>
          <div className="flex gap-4 justify-between items-center">
            <div className="flex flex-col gap-1 justify-between">
              <span>STK: 0392333687</span>
              <span>Ngân hàng: MB Bank</span>
              <span>Chủ tài khoản: Cong Thanh Le</span>
            </div>
            <QRCode value={'0392333687' || '-'} size={70} bordered={false} />
          </div>
        </div>
      </div>
      <div className="px-3 py-4 mt-auto">
        <button
          onClick={() => navigate('/', { replace: true })}
          className="w-full uppercase bg-yellow-400 hover:bg-emerald-800 text-secondary font-semibold py-3 px-6 rounded-xl shadow-lg transition-colors"
        >
          Xác nhận đặt
        </button>
      </div>
    </div>
  );
};

export default checkout;