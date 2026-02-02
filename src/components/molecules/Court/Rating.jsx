import { Rate } from 'antd';
import { useState } from 'react';

const Rating = ({ item }) => {
  const [expandedComments, setExpandedComments] = useState({});

  const toggleComment = (id) => {
    setExpandedComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-5 p-2 max-h-[calc(100vh-410px)] overflow-y-auto">
      {item.map((rate) => (
        <div key={rate.id} className="flex gap-3">
          <img src={rate.avatar} className="w-12 h-12 rounded-2xl"/>
          <div>
            <p className="font-semibold text-sm">{rate.user}</p>
            <div className="flex items-center gap-2 text-sm text-yellow-400">
              <span>{rate.score}</span>
              <Rate allowHalf defaultValue={rate.score} disabled />
            </div>
            <div>
              <p className={`text-sm text-secondary ${expandedComments[rate.id] ? '' : 'line-clamp-3'}`}>
                {rate.comment}
              </p>
              {rate.comment && rate.comment.length > 150 && (
                <button
                  onClick={() => toggleComment(rate.id)}
                  className="text-secondary text-sm font-semibold underline mt-1"
                >
                  {expandedComments[rate.id] ? 'Rút gọn' : 'Xem thêm'}
                </button>
              )}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Rating;