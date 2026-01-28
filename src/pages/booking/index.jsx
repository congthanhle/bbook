import { useState, useRef } from 'react';
import { TbChevronLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Stage, Layer, Rect, Text, Group, Line } from 'react-konva';

const BadmintonCourtBooking = () => {
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [cellWidth, setCellWidth] = useState(90);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const stageRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const courts = ['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4', 'Sân 5', 'Sân 6'];
  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const bookedSlots = new Set([
    '0-2', '0-5', '1-3', '2-8', '3-10', '4-6', '5-12'
  ]);

  const cellHeight = 40;
  const headerHeight = 70;
  const leftColumnWidth = 100;
  const padding = 10;

  const gridWidth = timeSlots.length * cellWidth;
  const gridHeight = courts.length * cellHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
    setScrollLeft(e.target.scrollLeft);
  };

  // Màu sắc
  const colors = {
    primary: '#00D9FF',
    secondary: '#FF6B9D',
    background: '#0F1419',
    surface: '#1A2028',
    cellBg: '#9E9E9E',        // Xám - Đang trống
    hover: '#BDBDBD',          // Xám sáng - Hover
    booked: '#F44336',         // Đỏ - Khóa
    selected: '#2196F3',       // Xanh - Đang chọn
    text: '#E8EAED',
    textSecondary: '#8B95A1',
    border: '#3A424D',
    gridLine: '#2A3139'
  };

  const handleSlotClick = (courtIndex, timeIndex) => {
    const slotId = `${courtIndex}-${timeIndex}`;

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
    if (hoveredSlot === slotId) return colors.hover;

    return colors.cellBg;
  };

  return (
    <div className="w-screen h-screen  flex flex-col overflow-hidden font-sans">
      <div className="bg-emerald-700">
        <div className="flex justify-between items-center gap-4 p-3">
          <TbChevronLeft size={28} className="text-white" onClick={() => navigate(-1, { replace: true })} />
          <p className="text-white text-center font-semibold text-base">Đặt lịch</p>
          <div className="w-6"></div>
        </div>
      </div>
      <div className=" rounded-xl  py-4 flex items-center gap-4 min-w-[300px]">
        <div className="relative">
          <div className="absolute top-0 left-0 z-30" style={{ width: leftColumnWidth, height: headerHeight }}>
            <Stage width={leftColumnWidth} height={headerHeight}>
              <Layer>
                <Rect
                  x={0}
                  y={0}
                  width={leftColumnWidth}
                  height={headerHeight}
                  fill={colors.surface}
                />
              </Layer>
            </Stage>
          </div>
          <div className="absolute top-0 z-20 overflow-hidden" style={{ left: leftColumnWidth, width: 'calc(100vw - 130px)', maxWidth: gridWidth, height: headerHeight }}>
            <div style={{ transform: `translateX(-${scrollLeft}px)`, width: gridWidth }}>
              <Stage width={gridWidth} height={headerHeight}>
                <Layer>
                  <Rect
                    x={0}
                    y={0}
                    width={gridWidth}
                    height={headerHeight}
                    fill={colors.surface}
                  />
                  {timeSlots.map((time, index) => (
                    <Group key={`header-${index}`}>
                      <Rect
                        x={index * cellWidth}
                        y={padding}
                        width={cellWidth}
                        height={headerHeight - padding}
                        fill={colors.cellBg}
                        cornerRadius={8}
                      />
                      <Text
                        x={index * cellWidth}
                        y={padding}
                        width={cellWidth}
                        height={headerHeight - padding}
                        text={time}
                        fontSize={14}
                        fontFamily='"SF Pro Display", -apple-system, sans-serif'
                        fontStyle='600'
                        fill={colors.text}
                        align='center'
                        verticalAlign='middle'
                      />
                    </Group>
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>

          {/* Fixed Left Column - Court Names */}
          <div className="absolute left-0 z-20 overflow-hidden" style={{ top: headerHeight, width: leftColumnWidth, height: 'calc(100vh - 400px)', maxHeight: gridHeight }}>
            <div style={{ transform: `translateY(-${scrollTop}px)`, height: gridHeight }}>
              <Stage width={leftColumnWidth} height={gridHeight}>
                <Layer>
                  <Rect
                    x={0}
                    y={0}
                    width={leftColumnWidth}
                    height={gridHeight}
                    fill={colors.surface}
                  />
                  {courts.map((court, index) => (
                    <Group key={`court-${index}`}>
                      <Rect
                        x={padding}
                        y={index * cellHeight}
                        width={leftColumnWidth - padding}
                        height={cellHeight}
                        fill={colors.cellBg}
                        cornerRadius={6}
                      />
                      <Text
                        x={padding}
                        y={index * cellHeight}
                        width={leftColumnWidth - padding}
                        height={cellHeight}
                        text={court}
                        fontSize={16}
                        fontFamily='"SF Pro Display", -apple-system, sans-serif'
                        fontStyle='600'
                        fill={colors.text}
                        align='center'
                        verticalAlign='middle'
                      />
                    </Group>
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>

          {/* Scrollable Grid Area */}
          <div
            ref={scrollContainerRef}
            className="overflow-auto"
            style={{
              marginLeft: leftColumnWidth,
              marginTop: headerHeight,
              width: 'calc(100vw - 130px)',
              maxWidth: gridWidth + 20,
              height: 'calc(100vh - 400px)',
              maxHeight: gridHeight + 20
            }}
            onScroll={handleScroll}
          >
            <Stage width={gridWidth} height={gridHeight}>
              <Layer>
                <Rect
                  x={0}
                  y={0}
                  width={gridWidth}
                  height={gridHeight}
                  fill={colors.surface}
                />

                {/* Grid Lines - Vertical */}
                {timeSlots.map((_, index) => (
                  <Line
                    key={`v-${index}`}
                    points={[
                      index * cellWidth,
                      0,
                      index * cellWidth,
                      gridHeight
                    ]}
                    stroke={colors.gridLine}
                    strokeWidth={1}
                  />
                ))}

                {/* Grid Lines - Horizontal */}
                {courts.map((_, index) => (
                  <Line
                    key={`h-${index}`}
                    points={[
                      0,
                      index * cellHeight,
                      gridWidth,
                      index * cellHeight
                    ]}
                    stroke={colors.gridLine}
                    strokeWidth={1}
                  />
                ))}

                {/* Grid Cells */}
                {courts.map((court, courtIndex) => (
                  timeSlots.map((time, timeIndex) => {
                    const slotId = `${courtIndex}-${timeIndex}`;
                    const isBooked = bookedSlots.has(slotId);
                    const isSelected = selectedSlots.has(slotId);

                    return (
                      <Group key={slotId}>
                        <Rect
                          x={timeIndex * cellWidth + 2}
                          y={courtIndex * cellHeight + 2}
                          width={cellWidth - 4}
                          height={cellHeight - 4}
                          fill={getSlotColor(courtIndex, timeIndex)}
                          cornerRadius={8}
                          shadowColor='rgba(0,0,0,0.2)'
                          shadowBlur={isSelected ? 10 : 0}
                          shadowOffset={{ x: 0, y: 2 }}
                          onClick={() => handleSlotClick(courtIndex, timeIndex)}
                          onTap={() => handleSlotClick(courtIndex, timeIndex)}
                          onMouseEnter={() => !isBooked && setHoveredSlot(slotId)}
                          onMouseLeave={() => setHoveredSlot(null)}
                          style={{ cursor: isBooked ? 'not-allowed' : 'pointer' }}
                        />

                        {/* Status Icon */}
                        {(isBooked || isSelected) && (
                          <Text
                            x={timeIndex * cellWidth}
                            y={courtIndex * cellHeight}
                            width={cellWidth}
                            height={cellHeight}
                            text={isBooked ? '✕' : '✓'}
                            fontSize={20}
                            fontStyle='bold'
                            fill='white'
                            align='center'
                            verticalAlign='middle'
                            listening={false}
                          />
                        )}
                      </Group>
                    );
                  })
                ))}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>

      {/* <input
        type="range"
        min="60"
        max="150"
        step="5"
        value={cellWidth}
        onChange={(e) => setCellWidth(parseFloat(e.target.value))}
        className="flex-1 h-1.5 rounded-full outline-none cursor-pointer appearance-none"
        style={{
          background: `linear-gradient(to right, #2196F3 0%, #2196F3 ${(cellWidth - 60) / 90 * 100}%, #3A424D ${(cellWidth - 60) / 90 * 100}%, #3A424D 100%)`
        }}
      /> */}
      {/* <div className="p-5 bg-[#1A2028] border-t border-[#3A424D] flex justify-between items-center flex-wrap gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#9E9E9E] rounded border-2 border-[#3A424D]" />
            <span className="text-sm text-[#E8EAED]">Trống (Xám)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#2196F3] rounded" />
            <span className="text-sm text-[#E8EAED]">Đang chọn (Xanh)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#F44336] rounded" />
            <span className="text-sm text-[#E8EAED]">Khóa (Đỏ)</span>
          </div>
        </div>

        <button
          onClick={() => {
            if (selectedSlots.size > 0) {
              alert(`Đã chọn ${selectedSlots.size} khung giờ`);
            }
          }}
          disabled={selectedSlots.size === 0}
          className={`px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${selectedSlots.size > 0
            ? 'bg-gradient-to-r from-[#00D9FF] to-[#FF6B9D] text-white cursor-pointer shadow-[0_4px_16px_rgba(0,217,255,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,217,255,0.4)]'
            : 'bg-[#3A424D] text-white cursor-not-allowed scale-[0.98]'
          }`}
        >
      Đặt sân ({selectedSlots.size})
        </button>
      </div> */}
    </div >
  );
};

export default BadmintonCourtBooking;