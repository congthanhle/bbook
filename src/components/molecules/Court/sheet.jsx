import { TbHeart, TbMapPin2 } from 'react-icons/tb';
import { courtItem } from '@/mock/court';

const sheet = ({ court = courtItem }) => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img src={court.thumbnail} className="max-h-[200px] w-full object-cover rounded-t-2xl"/>
        <img src={court?.logo} className="w-12 h-12 bg-white absolute top-3 left-3 rounded-lg"/>
        <div className="absolute top-3 right-3 flex gap-2 items-center text-secondary">
          <div className="bg-white p-1 rounded-full">
            <TbMapPin2 size={24}/>
          </div>
          <div className="bg-white p-1 rounded-full">
            <TbHeart size={24}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sheet;