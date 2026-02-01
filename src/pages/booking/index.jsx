import { useState, useRef } from 'react';
import { TbChevronLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const BadmintonCourtBooking = () => {
  const navigate = useNavigate();

  // ==================== STATE MANAGEMENT ====================
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [cellWidth, setCellWidth] = useState(90);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  // ==================== DATA CONFIGURATION ====================
  const courts = ['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4', 'Sân 5', 'Sân 6'];
  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];
  const bookedSlots = new Set([
    '0-2', '0-5', '1-3', '2-8', '3-10', '4-6', '5-12'
  ]);

  // ==================== LAYOUT DIMENSIONS ====================
  const cellHeight = 70;
  const labelPadding = 30; // Padding for first time label
  const endPadding = 5; // Minimal padding after last label

  // ==================== COLOR SCHEME ====================
  const colors = {
    cellBg: '#FFFFFF',
    booked: '#FFEBEE',
    selected: '#BBDEFB',
    border: '#E0E0E0',
    surface: '#F8F9FA',
  };

  // ==================== EVENT HANDLERS ====================
  const handleScroll = (e) => {
    setScrollLeft(e.target.scrollLeft);
  };

  const handleSlotClick = (courtIndex, timeIndex) => {
    const slotId = `${courtIndex}-${timeIndex}`;

    // Log slot position
    console.log('Clicked slot:', {
      slotId,
      court: courts[courtIndex],
      time: timeSlots[timeIndex],
      courtIndex,
      timeIndex
    });

    if (bookedSlots.has(slotId)) return;

    const newSelected = new Set(selectedSlots);
    if (newSelected.has(slotId)) {
      newSelected.delete(slotId);
    } else {
      newSelected.add(slotId);
    }
    setSelectedSlots(newSelected);
  };

  const getSlotColor = (courtIndex, timeIndex) => {
    const slotId = `${courtIndex}-${timeIndex}`;
    if (bookedSlots.has(slotId)) return colors.booked;
    if (selectedSlots.has(slotId)) return colors.selected;
    return colors.cellBg;
  };

  const getSlotIcon = (courtIndex, timeIndex) => {
    const slotId = `${courtIndex}-${timeIndex}`;
    if (bookedSlots.has(slotId)) return '✕';
    if (selectedSlots.has(slotId)) return '✓';
    return '';
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden font-sans bg-white">
      {/* Header */}
      <div className="bg-emerald-700">
        <div className="flex justify-between items-center gap-4 p-3">
          <TbChevronLeft
            size={28}
            className="text-white cursor-pointer"
            onClick={() => navigate(-1, { replace: true })}
          />
          <p className="text-white text-center font-semibold text-base">Đặt lịch</p>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Main Grid Container */}
      <div className="flex-1 overflow-hidden relative">
        {/* Fixed Headers Container */}
        <div className="absolute top-0 left-0 right-0 z-10 flex pointer-events-none" style={{ height: '50px' }}>
          {/* Top-left corner */}
          <div
            className="flex-shrink-0 bg-gray-100 border-b border-r border-gray-300"
            style={{ width: '70px', height: '50px' }}
          />

          {/* Time header - syncs with scroll */}
          <div className="flex-1 overflow-hidden relative">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div
                className="flex relative bg-gray-100 border-b border-gray-300"
                style={{
                  minWidth: `${timeSlots.length * cellWidth + labelPadding + endPadding}px`,
                  height: '50px',
                  transform: `translateX(-${scrollLeft}px)`,
                  paddingLeft: `${labelPadding}px`,
                  paddingRight: `${endPadding}px`
                }}
              >
                {/* Time labels positioned on grid lines */}
                {timeSlots.map((time, index) => (
                  <div
                    key={`time-${index}`}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${labelPadding + index * cellWidth}px`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10
                    }}
                  >
                    <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow-sm">
                      {time}
                    </span>
                  </div>
                ))}
                {/* Last time label (23:00) */}
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${labelPadding + timeSlots.length * cellWidth}px`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                >
                  <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow-sm">
                    23:00
                  </span>
                </div>
                {/* Vertical grid lines in header - ALL lines including first */}
                {[...Array(timeSlots.length + 1)].map((_, index) => (
                  <div
                    key={`header-line-${index}`}
                    className="absolute top-0 bottom-0 border-r border-gray-300"
                    style={{ left: `${labelPadding + index * cellWidth}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex" style={{ marginTop: '50px', height: 'calc(100vh - 250px)' }}>
          {/* Court names - fixed left column */}
          <div className="flex-shrink-0 overflow-hidden" style={{ width: '70px' }}>
            <div className="flex flex-col">
              {courts.map((court, index) => (
                <div
                  key={`court-${index}`}
                  className="flex-shrink-0 flex items-center justify-center bg-gray-100 border-b border-r border-gray-300 font-semibold text-sm text-gray-700"
                  style={{ height: `${cellHeight}px` }}
                >
                  {court}
                </div>
              ))}
            </div>
          </div>

          {/* Main scrollable grid */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-auto"
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
            onScroll={handleScroll}
          >
            <div style={{ minWidth: `${timeSlots.length * cellWidth + labelPadding + endPadding}px` }}>
              {courts.map((court, courtIndex) => (
                <div key={`row-${courtIndex}`} className="flex" style={{ paddingLeft: `${labelPadding}px`, paddingRight: `${endPadding}px` }}>
                  {timeSlots.map((time, timeIndex) => {
                    const slotId = `${courtIndex}-${timeIndex}`;
                    const isBooked = bookedSlots.has(slotId);
                    const isSelected = selectedSlots.has(slotId);

                    return (
                      <div
                        key={slotId}
                        className={`flex-shrink-0 flex items-center justify-center border-b border-r border-gray-300 transition-colors ${
                          !isBooked ? 'cursor-pointer active:opacity-70' : 'cursor-not-allowed'
                        }`}
                        style={{
                          width: `${cellWidth}px`,
                          height: `${cellHeight}px`,
                          backgroundColor: getSlotColor(courtIndex, timeIndex),
                          touchAction: 'pan-x pan-y'
                        }}
                        onClick={() => handleSlotClick(courtIndex, timeIndex)}
                      >
                        {(isBooked || isSelected) && (
                          <span
                            className={`text-xl font-bold ${
                              isBooked ? 'text-red-600' : 'text-blue-600'
                            }`}
                          >
                            {getSlotIcon(courtIndex, timeIndex)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom slider */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Zoom</span>
          <input
            type="range"
            min="60"
            max="150"
            step="5"
            value={cellWidth}
            onChange={(e) => setCellWidth(parseFloat(e.target.value))}
            className="flex-1 rounded-full outline-none cursor-pointer appearance-none h-2"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(cellWidth - 60) / 90 * 100}%, #e5e7eb ${(cellWidth - 60) / 90 * 100}%, #e5e7eb 100%)`
            }}
          />
          <span className="text-xs text-gray-500">{cellWidth}px</span>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3 justify-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded" />
            <span className="text-xs text-gray-600">Trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.selected }} />
            <span className="text-xs text-gray-600">Đang chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.booked }} />
            <span className="text-xs text-gray-600">Đã đặt</span>
          </div>
        </div>

        {/* Book button */}
        {selectedSlots.size > 0 && (
          <button
            onClick={() => alert(`Đã chọn ${selectedSlots.size} khung giờ`)}
            className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg active:scale-95 transition-transform"
          >
            Đặt sân ({selectedSlots.size})
          </button>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type='range']::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default BadmintonCourtBooking;