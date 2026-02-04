import { useState } from 'react';
import { TbChevronLeft, TbUser, TbCode, TbCheckupList, TbReportMoney } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderStore } from '@/state/order';
import { FORMAT_CURRENCY } from '@/utils/format';
import dayjs from 'dayjs';

const checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, court } = useOrderStore();

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
          <span className="font-semibold">Thông tin lịch đặt</span>
          <span className=" flex text-sm items-center gap-2"><TbUser size={18} /> Khách hàng: <strong>Cong Thanh Le - 0392333699</strong></span>
          <span className=" flex text-sm items-center gap-2"><TbCode size={18} /> Mã đơn: <strong>#5349</strong></span>
          <div className=" flex text-sm items-start gap-2">
            <TbCheckupList size={18} className="mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">Chi tiết:</span>
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

      </div>
    </div>
  );
};

export default checkout;