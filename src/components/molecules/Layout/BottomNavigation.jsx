import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import routes from '@/routes';

const BottomNavigation = () => {
  const rootRouter = routes.filter((route) => route.isRootRouter);
  const navigate = useNavigate();
  const location = useLocation();

  const isRouteActive = (routePath) => {
    if (routePath === location.pathname) return true;
    return false;
  };

  return (
    <div className="px-2 fixed bottom-2 left-0 right-0 z-50">
      {
        rootRouter.find(item => item.path === location.pathname) && (
          <div className="w-full bg-emerald-500 p-1.5 rounded-2xl h-14">
            <div className="flex justify-between items-center w-full h-full bg-white bg-opacity-10 rounded-xl">
              {
                rootRouter.map((route) => (
                  <div
                    key={route.key}
                    className={clsx(
                      'flex items-center justify-center relative text-3xl flex-1 h-full rounded-xl text-white',
                      isRouteActive(route.path) ? 'bg-emerald-800 bg-opacity-80' : ''
                    )}
                    onClick={() => navigate(route.path)}
                  >
                    { route.icon }
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default BottomNavigation;