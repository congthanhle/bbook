import { useState, useRef, useEffect } from 'react';
import { TbChevronLeft } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker, Slider } from 'antd';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import { FORMAT_CURRENCY } from '@/utils/format';
import { useOrderStore } from '@/state/order';
import { clear } from 'antd-mobile/es/components/dialog/clear';

const BadmintonCourtBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, setOrder, setCourt, clearOrder } = useOrderStore();

  const [selectedSlotsByDate, setSelectedSlotsByDate] = useState({});
  const [cellWidth, setCellWidth] = useState(50);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const scrollContainerRef = useRef(null);
  const timeHeaderRef = useRef(null);
  const scrollAnimationRef = useRef(null);

  const selectedSlots = selectedSlotsByDate[selectedDate.format('YYYY-MM-DD')] || [];

  const courts = ['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4', 'Sân 5', 'Sân 6'];
  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '15:30', '16:00', '16:30', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];
  const courtSample = {
    name: 'San Badminton Center',
    address: '123 Đường Thể Thao, Quận 1, TP.HCM',
    contact: '0123 456 789',
  };

  const priceByTime = {
    '06:00': 80000,
    '07:00': 80000,
    '08:00': 100000,
    '09:00': 100000,
    '10:00': 100000,
    '11:00': 100000,
    '12:00': 80000,
    '13:00': 80000,
    '14:00': 80000,
    '15:00': 120000,
    '15:30': 120000,
    '16:00': 120000,
    '16:30': 120000,
    '17:00': 150000,
    '18:00': 150000,
    '19:00': 150000,
    '20:00': 150000,
    '21:00': 120000,
    '22:00': 100000,
    '23:00': 80000,
  };

  const bookedSlotsByDate = {
    '2026-02-02': ['0-2', '0-5', '1-3', '2-8'],
    '2026-02-03': ['3-10', '4-6', '5-12'],
    '2026-02-04': ['1-5', '2-10'],
  };

  const cellHeight = 60;

  const colors = {
    cellBg: '#FFFFFF',
    booked: '#f87171',
    selected: '#BBDEFB',
    border: '#E0E0E0',
    surface: '#F8F9FA',
  };

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(selectedSlotsByDate).forEach(slots => {
      slots.forEach(slotId => {
        const [, timeIndex] = slotId.split('-').map(Number);
        const timeSlot = timeSlots[timeIndex];
        total += priceByTime[timeSlot] || 0;
      });
    });
    return total;
  };

  const getTotalSlotCount = () => {
    return Object.values(selectedSlotsByDate).reduce((sum, slots) => sum + slots.length, 0);
  };

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    if (timeHeaderRef.current) {
      const headerContent = timeHeaderRef.current.firstChild;
      if (headerContent) {
        headerContent.style.transform = `translateX(-${scrollLeft}px)`;
      }
    }
  };

  const handleSlotClick = (courtIndex, timeIndex) => {
    const slotId = `${courtIndex}-${timeIndex}`;
    const timeSlot = timeSlots[timeIndex];
    const dateKey = selectedDate.format('YYYY-MM-DD');
    const currentBookedSlots = bookedSlotsByDate[dateKey] || [];

    if (isSlotInPast(timeSlot) || currentBookedSlots.includes(slotId)) return;

    const currentDateSlots = selectedSlotsByDate[dateKey] || [];

    if (currentDateSlots.includes(slotId)) {
      const updatedSlots = currentDateSlots.filter(id => id !== slotId);
      setSelectedSlotsByDate({
        ...selectedSlotsByDate,
        [dateKey]: updatedSlots
      });
    } else {
      setSelectedSlotsByDate({
        ...selectedSlotsByDate,
        [dateKey]: [...currentDateSlots, slotId]
      });
    }
  };

  const handleTimeSlotClick = (timeIndex) => {
    const timeSlot = timeSlots[timeIndex];
    const dateKey = selectedDate.format('YYYY-MM-DD');
    const currentBookedSlots = bookedSlotsByDate[dateKey] || [];
    const currentDateSlots = selectedSlotsByDate[dateKey] || [];

    if (isSlotInPast(timeSlot)) return;

    const availableSlots = [];
    courts.forEach((_, courtIndex) => {
      const slotId = `${courtIndex}-${timeIndex}`;
      if (!currentBookedSlots.includes(slotId)) {
        availableSlots.push(slotId);
      }
    });

    const allSelected = availableSlots.every(slotId => currentDateSlots.includes(slotId));

    if (allSelected) {
      const updatedSlots = currentDateSlots.filter(slotId => !availableSlots.includes(slotId));
      setSelectedSlotsByDate({
        ...selectedSlotsByDate,
        [dateKey]: updatedSlots
      });
    } else {
      const newSlots = [...currentDateSlots];
      availableSlots.forEach(slotId => {
        if (!newSlots.includes(slotId)) {
          newSlots.push(slotId);
        }
      });
      setSelectedSlotsByDate({
        ...selectedSlotsByDate,
        [dateKey]: newSlots
      });
    }
  };

  const handleCourtClick = (courtIndex) => {
    const dateKey = selectedDate.format('YYYY-MM-DD');
    const currentBookedSlots = bookedSlotsByDate[dateKey] || [];
    const currentDateSlots = selectedSlotsByDate[dateKey] || [];

    const availableSlots = [];
    timeSlots.forEach((timeSlot, timeIndex) => {
      const slotId = `${courtIndex}-${timeIndex}`;
      if (!currentBookedSlots.includes(slotId) && !isSlotInPast(timeSlot)) {
        availableSlots.push(slotId);
      }
    });

    const allSelected = availableSlots.every(slotId => currentDateSlots.includes(slotId));

    if (allSelected) {
      const updatedSlots = currentDateSlots.filter(slotId => !availableSlots.includes(slotId));
      setSelectedSlotsByDate({
        ...selectedSlotsByDate,
        [dateKey]: updatedSlots
      });
    } else {
      const newSlots = [...currentDateSlots];
      availableSlots.forEach(slotId => {
        if (!newSlots.includes(slotId)) {
          newSlots.push(slotId);
        }
      });
      setSelectedSlotsByDate({
        ...selectedSlotsByDate,
        [dateKey]: newSlots
      });
    }
  };

  const isSlotInPast = (timeSlot) => {
    const now = dayjs();
    const today = now.format('YYYY-MM-DD');
    const selectedDateStr = selectedDate.format('YYYY-MM-DD');

    if (selectedDateStr < today) return true;

    if (selectedDateStr > today) return false;

    const [hours] = timeSlot.split(':').map(Number);
    const currentHour = now.hour();
    return hours <= currentHour;
  };

  const getSlotColor = (courtIndex, timeIndex) => {
    const slotId = `${courtIndex}-${timeIndex}`;
    const timeSlot = timeSlots[timeIndex];
    const currentBookedSlots = bookedSlotsByDate[selectedDate.format('YYYY-MM-DD')] || [];

    if (isSlotInPast(timeSlot)) return '#9ca3af';
    if (currentBookedSlots.includes(slotId)) return colors.booked;
    if (selectedSlots.includes(slotId)) return colors.selected;
    return colors.cellBg;
  };

  const scrollToCurrentTime = () => {
    const now = dayjs();
    const currentHour = now.hour();
    let targetIndex = timeSlots.findIndex(slot => {
      const [hours] = slot.split(':').map(Number);
      return hours >= currentHour;
    });
    if (targetIndex === -1) {
      targetIndex = timeSlots.length - 1;
    }

    const scrollPosition = Math.max(0, (targetIndex - 1) * cellWidth);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmitBooking = () => {
    const bookingsByDate = {};

    Object.entries(selectedSlotsByDate).forEach(([date, slots]) => {
      if (slots.length > 0) {

        const allBookings = slots.map(slotId => {
          const [courtIndex, timeIndex] = slotId.split('-').map(Number);
          const court = courts[courtIndex];
          const timeSlot = timeSlots[timeIndex];
          const price = priceByTime[timeSlot];

          return {
            slotId,
            court,
            courtIndex,
            timeIndex,
            timeSlot,
            price
          };
        });
        const groupedByCourt = {};
        allBookings.forEach(booking => {
          if (!groupedByCourt[booking.court]) {
            groupedByCourt[booking.court] = [];
          }
          groupedByCourt[booking.court].push(booking);
        });

        const mergedBookings = [];
        Object.values(groupedByCourt).forEach(courtBookings => {
          courtBookings.sort((a, b) => a.timeIndex - b.timeIndex);

          let i = 0;
          while (i < courtBookings.length) {
            const current = courtBookings[i];
            let endTimeIndex = current.timeIndex;
            let totalPrice = current.price;
            const slotIds = [current.slotId];

            let j = i + 1;
            while (j < courtBookings.length && courtBookings[j].timeIndex === endTimeIndex + 1) {
              endTimeIndex = courtBookings[j].timeIndex;
              totalPrice += courtBookings[j].price;
              slotIds.push(courtBookings[j].slotId);
              j++;
            }
            const startTime = timeSlots[current.timeIndex];
            const endTime = timeSlots[endTimeIndex + 1] || '24:00';
            const timeRange = `${startTime} - ${endTime}`;

            mergedBookings.push({
              slotId: slotIds.join(','),
              court: current.court,
              courtIndex: current.courtIndex,
              time: timeRange,
              timeIndex: current.timeIndex,
              price: totalPrice
            });

            i = j;
          }
        });

        bookingsByDate[date] = mergedBookings;
      }
    });

    setOrder({
      ...order,
      bookingsByDate,
      totalSlots: getTotalSlotCount(),
      totalPrice: calculateTotalPrice()
    });
    setCourt(courtSample);
    navigate(`/booking/confirm/${id}`);
  };

  useEffect(() => {
    if (order?.bookingsByDate) {
      const initialSelectedSlots = {};
      Object.entries(order.bookingsByDate).forEach(([date, bookings]) => {
        const slotIds = [];
        bookings.forEach(b => {
          if (b.slotId.includes(',')) {
            slotIds.push(...b.slotId.split(','));
          } else {
            slotIds.push(b.slotId);
          }
        });
        initialSelectedSlots[date] = slotIds;
      });
      setSelectedSlotsByDate(initialSelectedSlots);
    }
  }, []);

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const selectedDateStr = selectedDate.format('YYYY-MM-DD');

    if (selectedDateStr === today) {
      setTimeout(() => {
        scrollToCurrentTime();
      }, 100);
    }
  }, []);

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const selectedDateStr = selectedDate.format('YYYY-MM-DD');

    if (selectedDateStr === today) {
      setTimeout(() => {
        scrollToCurrentTime();
      }, 100);
      return;
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [selectedDate]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden font-sans bg-white">
      <div className="bg-emerald-700 pb-4">
        <div className="flex justify-between items-center gap-4 px-3 py-4">
          <TbChevronLeft
            size={28}
            className="text-white cursor-pointer"
            onClick={() => {
              clearOrder();
              navigate('/', { replace: true });
            }}
          />
          <span className="text-white text-center font-semibold text-base">Đặt lịch</span>
          <div className="w-6"></div>
        </div>
        <div className="flex gap-3 justify-center flex-wrap text-white text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-white border-gray-300 rounded" />
            <span>Trống</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: colors.selected }} />
            <span>Đang chọn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: colors.booked }} />
            <span>Đã đặt</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-gray-400 rounded" />
            <span>Đã qua</span>
          </div>
        </div>
        <div className="px-3 mt-4 w-1/2 ml-auto">
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date || dayjs());
            }}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày"
            className="w-full border-none"
            allowClear={false}
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative text-secondary">
        <div className="absolute top-0 left-0 right-0 z-10 flex h-[50px]">
          <div className="flex-shrink-0 bg-teal-100 border-b border-r border-gray-300 w-[70px] h-[50px] pointer-events-none" />
          <div className="flex-1 overflow-hidden relative">
            <div
              ref={timeHeaderRef}
              className="overflow-hidden"
            >
              <div
                className="flex bg-teal-100 border-b border-gray-300 h-[50px] transition-transform duration-0"
                style={{
                  minWidth: `${timeSlots.length * cellWidth}px`,
                  willChange: 'transform'
                }}
              >
                {timeSlots.map((time, index) => (
                  <div
                    key={`time-${index}`}
                    className={`flex-shrink-0 flex flex-col items-center justify-center border-r border-gray-200 ${isSlotInPast(time) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-teal-200 active:bg-teal-300'
                    } transition-colors`}
                    style={{
                      width: `${cellWidth}px`,
                      boxSizing: 'border-box'
                    }}
                    onClick={() => handleTimeSlotClick(index)}
                  >
                    <div className="font-semibold text-sm">{time}</div>
                    <div className="text-xs text-emerald-600 font-medium">
                      {(priceByTime[time] / 1000).toFixed(0)}k
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-[50px] h-[calc(100vh-250px)]">
          <div className="flex-shrink-0 overflow-hidden w-[70px]">
            <div className="flex flex-col">
              {courts.map((court, index) => (
                <div
                  key={`court-${index}`}
                  className="flex-shrink-0 flex items-center justify-center bg-teal-100 border-b border-r border-gray-300 font-semibold text-sm text-secondary cursor-pointer hover:bg-teal-200 active:bg-teal-300 transition-colors"
                  style={{ height: `${cellHeight}px` }}
                  onClick={() => handleCourtClick(index)}
                >
                  {court}
                </div>
              ))}
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-auto [-webkit-overflow-scrolling:touch] overscroll-contain"
            onScroll={handleScroll}
          >
            <div style={{ minWidth: `${timeSlots.length * cellWidth}px` }}>
              {courts.map((court, courtIndex) => (
                <div key={`row-${courtIndex}`} className="flex">
                  {timeSlots.map((time, timeIndex) => {
                    const slotId = `${courtIndex}-${timeIndex}`;
                    const currentBookedSlots = bookedSlotsByDate[selectedDate.format('YYYY-MM-DD')] || [];
                    const isBooked = currentBookedSlots.includes(slotId);
                    const isPast = isSlotInPast(time);
                    const isDisabled = isPast || isBooked;

                    return (
                      <div
                        key={slotId}
                        className={`flex-shrink-0 flex items-center justify-center border-b border-r border-gray-300 transition-colors ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer active:opacity-70'
                        }`}
                        style={{
                          width: `${cellWidth}px`,
                          height: `${cellHeight}px`,
                          backgroundColor: getSlotColor(courtIndex, timeIndex),
                          touchAction: 'pan-x pan-y',
                          boxSizing: 'border-box'
                        }}
                        onClick={() => handleSlotClick(courtIndex, timeIndex)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200 text-secondary">
        <div className="flex items-center gap-3">
          <span className="text-xs whitespace-nowrap">Zoom</span>
          <Slider
            min={50}
            max={150}
            step={5}
            value={cellWidth}
            onChange={setCellWidth}
            className="flex-1"
          />
        </div>
        {getTotalSlotCount() > 0 && (
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Tổng tiền:</span>
              <span className="font-bold text-emerald-700 text-lg">
                {FORMAT_CURRENCY(calculateTotalPrice())}
              </span>
            </div>
            <button
              onClick={() => handleSubmitBooking()}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-800 text-white rounded-lg font-semibold shadow-lg active:scale-95 transition-transform"
            >
              Đặt sân
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadmintonCourtBooking;