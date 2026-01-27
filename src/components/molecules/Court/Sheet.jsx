import { TbHeart, TbMapPin2 } from 'react-icons/tb';
import { Tabs } from 'antd';
import { courtItem } from '@/mock/court';
import Price from '@/components/molecules/Court/Price';
import Image from '@/components/molecules/Court/Image';
import Service from '@/components/molecules/Court/Service';
import Rating from '@/components/molecules/Court/Rating';
import Policy from '@/components/molecules/Court/Policy';

const sheet = ({ court = courtItem }) => {

  const items = [
    { key: '1', label: 'Bảng giá', children: <Price item={courtItem.rental}/> },
    { key: '2', label: 'Hình ảnh', children: <Image item={courtItem.imgs}/> },
    { key: '3', label: 'Dịch vụ', children: <Service/> },
    { key: '4', label: 'Đánh giá', children: <Rating/> },
    { key: '5', label: 'Quy định', children: <Policy item={courtItem.rules}/> },
  ];

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
        <div className="absolute -bottom-4 left-0 px-4 w-full">
          <div className="bg-white rounded-md w-full p-2">
            <p className="font-semibold text-lg">{courtItem.name}</p>
          </div>
        </div>
      </div>
      <div className="px-2 mt-8">
        <Tabs defaultActiveKey="1" items={items}  />
      </div>
    </div>
  );
};

export default sheet;