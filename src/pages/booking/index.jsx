import { useState } from 'react';
import { TbChevronLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-emerald-700">
        <div className="flex justify-between items-center gap-4 p-3">
          <TbChevronLeft size={28} className="text-white" onClick={() => navigate(-1, { replace: true })}/>
          <p className="text-white text-center font-semibold text-base">Đặt lịch</p>
          <div className="w-6"></div>
        </div>
      </div>
    </div>
  );
};

export default index;