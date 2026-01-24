import HomePage from '@/pages';
import Map from '@/pages/map';
import Ticket from '@/pages/ticket';
import User from '@/pages/user';
import { TbSmartHome, TbMap2, TbUser, TbTicket } from 'react-icons/tb';

const routes = [
  {
    path: '/',
    key: 'home',
    component: <HomePage />,
    isRootRouter: true,
    icon: <TbSmartHome size={30}/>,
  },
  {
    path: '/map',
    key: 'map',
    component: <Map />,
    isRootRouter: true,
    icon: <TbMap2 size={29}/>,
  },
  {
    path: '/ticket',
    key: 'ticket',
    component: <Ticket />,
    isRootRouter: true,
    icon: <TbTicket size={30}/>,
  },
  {
    path: '/user',
    key: 'user',
    component: <User />,
    isRootRouter: true,
    icon: <TbUser size={30}/>,
  },
];

export default routes;