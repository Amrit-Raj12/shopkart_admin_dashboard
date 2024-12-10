import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AllProducts from './pages/Products/AllProducts';
import AddProduct from './pages/Products/AddProduct';
import AuthMiddleware from './AuthMiddleware';
import AdminSignInPage from './pages/Authentication/AdminSignIn';
import GuestMiddleware from './GuestGuardMiddleware';
import EditProduct from './pages/Products/EditProduct';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Shopkart Dashboard" />
              <ECommerce />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/products"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Products Page" />
              <AllProducts />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/products/add-product"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Add Products Page" />
              <AddProduct />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/product/:id/edit"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Edit Product Page" />
              <EditProduct />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/calendar"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Form Elements" />
              <FormElements />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/tables"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Tables" />
              <Tables />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/chart"
          element={
            <AuthMiddleware>
            <>
              <PageTitle title="Basic Chart | Shopkart - Dashboard" />
              <Chart />
            </>
            </AuthMiddleware>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Shopkart - Dashboard" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Shopkart - Dashboard" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <GuestMiddleware>
            <>
              <PageTitle title="Signin | Shopkart - Dashboard" />
              <AdminSignInPage />
            </>
            </GuestMiddleware>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <GuestMiddleware>
            <>
              {/* <PageTitle title="Signup | Shopkart - Dashboard" />
              <AdminRegistrationPage /> */}
              <div className='flex items-center justify-center h-screen'>
                <p><span className='font-bold text-[64px]'>404</span> page not found!</p>
              </div>
            </>
            </GuestMiddleware>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
