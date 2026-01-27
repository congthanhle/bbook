import { Image } from 'antd';

const Images = ({ item }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {
        item.map((img, index) => (
          <Image src={img} key={index} className="rounded-md"/>
        ))
      }
    </div>
  );
};

export default Images;