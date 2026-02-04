import { useState } from 'react';
import {
  TbChevronLeft,
  TbMap,
  TbCalendar,
  TbChevronDown,
  TbChevronUp,
  TbCakeRoll,
  TbTicket,
  TbInfoHexagon
} from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'antd';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import { useOrderStore } from '@/state/order';
import { FORMAT_CURRENCY } from '@/utils/format';

const confirm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, court } = useOrderStore();
  const [expandedDates, setExpandedDates] = useState({});

  const toggleDate = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: prev[date] !== undefined ? !prev[date] : false
    }));
  };

  const prepareBookingData = (date, bookings) => {
    const groupedByCourt = {};
    bookings.forEach((booking) => {
      if (!groupedByCourt[booking.court]) {
        groupedByCourt[booking.court] = [];
      }
      groupedByCourt[booking.court].push(booking);
    });
    const tableData = [];
    Object.entries(groupedByCourt).forEach(([court, courtBookings]) => {
      courtBookings.forEach((booking, index) => {
        tableData.push({
          key: `${date}-${court}-${index}`,
          court: index === 0 ? court : '',
          time: booking.time,
          price: booking.price,
          rowSpan: index === 0 ? courtBookings.length : 0,
        });
      });
    });
    const dateTotal = bookings.reduce((sum, booking) => sum + booking.price, 0);

    return { tableData, dateTotal };
  };

  const columns = [
    {
      title: 'Sân',
      dataIndex: 'court',
      key: 'court',
    },
    {
      title: 'Giờ',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (price) => FORMAT_CURRENCY(price),
    },
  ];

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center gap-4 px-3 py-4 bg-emerald-700">
        <TbChevronLeft
          size={28}
          className="text-white cursor-pointer"
          onClick={() => navigate(`/booking/${id}`, { replace: true })}
        />
        <span className="text-white text-center font-semibold text-base">Xác nhận đặt lịch</span>
        <div className="w-6"></div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-sm flex items-center gap-1"><TbMap size={18} /> Thông tin sân</span>
        <div className="flex flex-col bg-white rounded-xl p-3 shadow-lg text-secondary gap-2">
          <span className="font-semibold">{court.name}</span>
          <span className="text-sm">{court.address}</span>
        </div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-sm flex items-center gap-1"><TbCalendar size={20} />Thông tin lịch đặt</span>
        <div className="space-y-2">
          {order?.bookingsByDate && Object.entries(order.bookingsByDate).map(([date, bookings]) => {
            const { tableData, dateTotal } = prepareBookingData(date, bookings);
            const isExpanded = expandedDates[date] !== undefined ? expandedDates[date] : true;
            return (
              <div key={date} className="bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden">
                <div
                  className="font-semibold p-3 text-secondary text-sm flex items-center justify-between cursor-pointer bg-white active:bg-gray-100 transition-colors"
                  onClick={() => toggleDate(date)}
                >
                  <span>{dayjs(date).format('DD/MM/YYYY')}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-semibold">{FORMAT_CURRENCY(dateTotal)}</span>
                    {isExpanded ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
                  </div>
                </div>
                {isExpanded && (
                  <Table
                    columns={columns.map(col => ({
                      ...col,
                      onCell: col.dataIndex === 'court' ? (record) => ({
                        rowSpan: record.rowSpan,
                      }) : undefined,
                    }))}
                    dataSource={tableData}
                    pagination={false}
                    size="small"
                    bordered
                  />
                )}
              </div>
            );
          })}
          {order?.totalPrice > 0 && (
            <div className="bg-white text-emerald-700 rounded-xl p-3 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Tổng cộng:</span>
                <span className="text-sm font-semibold">
                  {FORMAT_CURRENCY(order.totalPrice)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-3 py-2 space-y-2">
        <span className="text-white text-sm flex items-center gap-1"><TbInfoHexagon size={18} />Thông tin của bạn</span>
        <div className="flex flex-col text-sm bg-white rounded-xl p-3 shadow-lg text-secondary gap-2">
          <div className="grid grid-cols-2 gap-2">
            <span className="font-semibold">Tên</span>
            <span className="text-right">Cong Thanh Le</span>
            <span className="font-semibold">Số điện thoại</span>
            <span className="text-right">0392999678</span>
          </div>
        </div>
      </div>

      <div className="px-3 py-4 mt-auto">
        <button
          onClick={() => navigate(`/booking/checkout/${id}`, { replace: true })}
          className="w-full bg-yellow-400 hover:bg-emerald-800 text-secondary font-semibold py-3 px-6 rounded-xl shadow-lg transition-colors"
        >
          Xác nhận & Thanh toán
        </button>
      </div>
    </div>
  );
};


export default confirm;