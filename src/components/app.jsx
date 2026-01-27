import routes from '@/routes';
import { Page } from 'zmp-ui';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Route, Routes } from 'react-router-dom';
import { App, SnackbarProvider, ZMPRouter } from 'zmp-ui';
import BottomNavigation from '@/components/molecules/Layout/BottomNavigation';
import Loading from '@/components/atoms/Loading';
import CustomSheet from '@/components/atoms/Sheet';

dayjs.locale('vi');

const theme = {
  components: {
    Rate: {
      starSize: 10,
    },
  },
};

const MyApp = () => {
  return (
    <App>
      <ConfigProvider
        theme={theme}
        locale={viVN}
      >
        <SnackbarProvider>
          <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-700">
            <Loading/>
            <ZMPRouter >
              <Routes>
                {routes.map((value) =>
                  <Route
                    path={value.path}
                    key={value.key}
                    element={
                      value.isRootRouter ? (
                        <Page>{value.component}</Page>
                      ) : (
                        <div className="min-h-screen overflow-scroll">{value.component}</div>
                      )
                    }
                  />)}
              </Routes>
              <BottomNavigation />
            </ZMPRouter>
            <CustomSheet />
          </div>
        </SnackbarProvider>
      </ConfigProvider>
    </App>
  );
};
export default MyApp;