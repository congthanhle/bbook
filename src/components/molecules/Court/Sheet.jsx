import { TbHeart, TbMapPin2, TbMapPin, TbPhone, TbStarFilled } from 'react-icons/tb';
import { Tabs } from 'antd';
import { courtItem } from '@/mock/court';
import Price from '@/components/molecules/Court/Price';
import Image from '@/components/molecules/Court/Image';
import Service from '@/components/molecules/Court/Service';
import Rating from '@/components/molecules/Court/Rating';
import Policy from '@/components/molecules/Court/Policy';
import { useNavigate } from 'react-router-dom';
import { useSheetStore } from '@/state/sheet';

const sheet = ({ court = courtItem }) => {
  const navigate = useNavigate();
  const { closeSheet } = useSheetStore();

  const items = [
    { key: '1', label: 'Bảng giá', children: <Price item={courtItem.rental}/> },
    { key: '2', label: 'Hình ảnh', children: <Image item={courtItem.imgs}/> },
    { key: '3', label: 'Dịch vụ', children: <Service item={courtItem.services}/> },
    { key: '4', label: 'Đánh giá', children: <Rating item={courtItem.rates.ratings}/> },
    { key: '5', label: 'Quy định', children: <Policy item={courtItem.rules}/> },
  ];

  const handleBooking = () => {
    closeSheet();
    navigate(`/booking/${court.id}`);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img src={court.thumbnail} className="max-h-[200px] w-full object-cover rounded-t-2xl"/>
        <div className="absolute top-3 left-3 flex gap-2 items-center text-secondary">
          <div className="bg-white p-1 rounded-full">
            <TbMapPin2 size={24}/>
          </div>
          <div className="bg-white p-1 rounded-full">
            <TbHeart size={24}/>
          </div>
        </div>
        <button
          className="absolute top-3 right-3 text-md font-semibold text-nowrap px-4 py-2 text-xs uppercase bg-yellow-400 rounded-md"
          onClick={handleBooking}
        >
            Đặt lịch
        </button>
        <div className="absolute -bottom-16 left-0 px-4 w-full">
          <div className="bg-white bg-opacity-95 rounded-md w-full p-3 ">
            <div className="flex items-center gap-3">
              <img src={court?.logo} className="w-9 h-9"/>
              <p className="font-semibold text-md">{courtItem.name}</p>
            </div>
            <div className="space-y-2 mt-2">
              <p className="flex items-center text-sm gap-2 text-secondary">
                <TbMapPin size={20}/>
                <span>{courtItem.address}</span>
              </p>
              <p className="flex items-center text-sm gap-2 text-secondary">
                <TbPhone size={20}/>
                <span>{courtItem.phone}</span>
              </p>
              <p className="flex items-center text-sm gap-2 text-secondary">
                <TbStarFilled size={20}/>
                <span>{courtItem.rates.average} {`(${courtItem.rates.totalRates} lượt đánh giá)`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 mt-16">
        <Tabs defaultActiveKey="1" items={items}  />
      </div>
    </div>
  );
};

export default sheet;