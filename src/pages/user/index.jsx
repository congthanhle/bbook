import { TbPhone } from 'react-icons/tb';
import { useUserStore } from '@/state/user';
import {
  TbGift, TbBookmark, TbMedal2, TbEdit,
  TbChevronRight,
  TbMessageChatbot, TbBrandStackshare, TbLogout
} from 'react-icons/tb';
import { MdOutlinePolicy, MdAttachFile } from 'react-icons/md';
const index = () => {
  const { user } = useUserStore();

  const mainMenu = [
    {
      id: 1,
      title: 'Sân đã đặt',
      icon: 'https://cdn-icons-png.flaticon.com/128/16090/16090543.png',
      route: '/user/booked-courts'
    },
    {
      id: 2,
      title: 'Vé vãng lai',
      icon: 'https://cdn-icons-png.flaticon.com/128/5198/5198241.png',
      route: '/user/walk-in-tickets'
    },
    {
      id: 3,
      title: 'Nhóm của tôi',
      icon: 'https://cdn-icons-png.flaticon.com/128/4859/4859784.png',
      route: '/user/my-groups'
    },
  ];

  const activityMenu = [
    {
      id: 1,
      title: 'Ưu đãi',
      icon: <TbGift size={24}/>,
      route: '/user/booked-courts'
    },
    {
      id: 2,
      title: 'Đăng ký khóa học',
      icon: <TbBookmark size={24}/>,
      route: '/user/walk-in-tickets'
    },
    {
      id: 3,
      title: 'Gói hội viên',
      icon: <TbMedal2 size={24}/>,
      route: '/user/my-groups'
    },
    {
      id: 4,
      title: 'Đăng ký tư vấn',
      icon: <TbEdit size={24}/>,
      route: '/user/my-groups'
    },
  ];

  const systemMenu = [
    {
      id: 1,
      title: 'Chia sẻ ứng dụng với bạn bè',
      icon: <TbBrandStackshare size={24}/>,
      route: '/user/my-groups'
    },
    {
      id: 2,
      title: 'Ghim ra màn hình chính',
      icon: <MdAttachFile size={24}/>,
      route: '/user/my-groups'
    },
    {
      id: 3,
      title: 'Chat Zalo OA',
      icon: <TbMessageChatbot size={24}/>,
      route: '/user/walk-in-tickets'
    },
    {
      id: 4,
      title: 'Điều khoản & Chính sách',
      icon: <MdOutlinePolicy size={24}/>,
      route: '/user/booked-courts'
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="bg-emerald-700 w-full p-3 rounded-b-2xl pb-20 relative">
        <div className="flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/128/2112/2112223.png" className="w-14 h-14 rounded-xl bg-white" />
          <div className="text-white space-y-2 flex flex-col">
            <span className="text-md font-semibold">{user?.name} Cong Thanh</span>
            <span className="text-sm flex items-center gap-1"><TbPhone size={18}/>0392999678</span>
          </div>
        </div>
        <div className="absolute -bottom-16 w-full left-0 px-3">
          <div className="bg-white bg-opacity-90 grid grid-cols-3 rounded-xl px-1 py-3 shadow-lg">
            {mainMenu.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2 p-2">
                <div className="bg-white p-2 rounded-lg border border-primary shadow-lg">
                  <img src={item.icon} className="w-9 h-9" />
                </div>
                <span className="text-sm font-medium text-secondary text-nowrap">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full px-4 mt-20 space-y-2">
        <p className="text-white text-lg font-semibold">Hoạt động</p>
        <div className="flex flex-col bg-white bg-opacity-90 rounded-xl px-4 shadow-lg">
          {activityMenu.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-2 py-4 border-b border-gray-300 last:border-b-0 text-secondary">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-md font-medium ">{item.title}</span>
              </div>
              <TbChevronRight size={20} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-4 mt-6 space-y-2">
        <p className="text-white text-lg font-semibold">Hệ thống</p>
        <div className="flex flex-col bg-white bg-opacity-90 rounded-xl px-4 shadow-lg">
          {systemMenu.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-2 py-4 border-b border-gray-300 last:border-b-0 text-secondary">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-md font-medium ">{item.title}</span>
              </div>
              <TbChevronRight size={20} />
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 w-full">
        <button className="mt-6 mb-4 bg-white bg-opacity-90 w-full rounded-xl flex items-center justify-center gap-2 py-3 shadow-lg text-md text-secondary">
          <TbLogout size={26}/>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default index;