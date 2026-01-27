import { getGreeting } from '@/utils';
import { TbPhone  } from 'react-icons/tb';
import { useUserStore } from '@/state/user';

const index = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col items-center">
      <div className="bg-emerald-700 w-full p-3 rounded-b-3xl pb-20 relative">
        <div className="flex items-center gap-4">
          <img src="https://cdn-icons-png.flaticon.com/128/2112/2112223.png" className="w-14 h-14 rounded-xl bg-white" />
          <div className="text-white space-y-1 flex flex-col">
            <span className="text-md font-semibold">{user?.name} Cong Thanh</span>
            <span className="text-sm flex items-center gap-1"><TbPhone size={18}/>0392333687</span>
          </div>
        </div>
        <div className="bg-white absolute bottom-0 w-full left-0">
            adasda
        </div>
      </div>

    </div>
  );
};

export default index;