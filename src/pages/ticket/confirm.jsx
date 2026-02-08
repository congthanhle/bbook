import { useState } from 'react';
import { TbChevronLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

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
    </div>

  );
};

export default confirm;