import { useState } from 'react';
import { TbChevronLeft, TbMap } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { ticketItem } from '@/mock/ticket';

const confirm = () => {
  const navigate = useNavigate();

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
        <span className="text-white text-sm flex items-center gap-1"><TbMap size={18} /> Thông tin lịch đánh</span>
        <div className="grid grid-cols-2 gap-2 bg-white rounded-xl p-3 text-secondary">
          <span className="font-semibold">Tên</span>
          <span className="font-semibold">Số điện thoại</span>
          <span className="text-right">0392999678</span>
        </div>
      </div>
    </div>

  );
};

export default confirm;