import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import useFetchWithToken from '../../hooks/useFetchWithToken';
import Loader from '../../common/Loader';
import SalesRevenueChart from '../../modules/revenueSalesChart';
import { profit, device_breakdown } from '../../data/dummyData';
import ProfitChart from '../../modules/ProfitChart';
import DeviceChart from '../../modules/DeviceChart';
import { GET_OVERVIEW_URL } from '../../constants/apiUrl';


const ECommerce: React.FC = () => {

  const token = localStorage.getItem('token') || ''; 
  const { data, error, loading } = useFetchWithToken<any>(
    GET_OVERVIEW_URL,
    token
  );

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const { overview } = data || {};

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Products" total={overview.totalProducts} rate="0.43%" bgColor='#FFF9C4' levelUp>
        <svg className="fill-primary dark:fill-white" width="18px" height="18px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-products" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M10 9C9.44771 9 9 9.44771 9 10V21C9 21.5523 9.44771 22 10 22H21C21.5523 22 22 21.5523 22 21V10C22 9.44771 21.5523 9 21 9H10ZM15 7V3C15 2.44772 14.5523 2 14 2H3C2.44772 2 2 2.44772 2 3V14C2 14.5523 2.44772 15 3 15H7V10C7 8.34315 8.34315 7 10 7H15ZM17 7H21C22.6569 7 24 8.34315 24 10V21C24 22.6569 22.6569 24 21 24H10C8.34315 24 7 22.6569 7 21V17H3C1.34315 17 0 15.6569 0 14V3C0 1.34315 1.34315 0 3 0H14C15.6569 0 17 1.34315 17 3V7Z" /></g></svg>
        </CardDataStats>
        <CardDataStats title="Total Orders" total={overview.totalOrders} rate="4.35%" bgColor='#B2C8E1' levelUp>
          <svg className="fill-primary dark:fill-white"  xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 100 100" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M78.8,62.1l-3.6-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,70.6c-1.2,0.6-2.7,0.6-3.9,0L26.5,60.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.6,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,78.5c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,65,80.4,62.8,78.8,62.1z" /> </g> <g> <path d="M78.8,48.1l-3.7-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,56.6c-1.2,0.6-2.7,0.6-3.9,0L26.6,46.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.7,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,64.6c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,51.1,80.4,48.9,78.8,48.1 z" /> </g> <g> <path d="M21.2,37.8l26.8,12.7c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7c1.6-0.8,1.6-2.9,0-3.7L51.9,21.4 c-1.2-0.6-2.7-0.6-3.9,0L21.2,34.2C19.6,34.9,19.6,37.1,21.2,37.8z" /> </g> </g> </g></svg>
        </CardDataStats>
        <CardDataStats title="Total Sales" total={overview.totalSales} rate="2.59%" bgColor='#A8E6CF' levelUp>
          <svg className="fill-primary dark:fill-white"  height="22px" width="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M189.218,200.348c-27.618,0-50.087,22.469-50.087,50.087c0,27.618,22.469,50.087,50.087,50.087 c27.618,0,50.087-22.469,50.087-50.087C239.305,222.817,216.836,200.348,189.218,200.348z M189.218,267.13 c-9.206,0-16.696-7.49-16.696-16.696c0-9.206,7.49-16.696,16.696-16.696s16.696,7.49,16.696,16.696 C205.913,259.641,198.424,267.13,189.218,267.13z" /> </g> </g> <g> <g> <path d="M322.783,333.913c-27.618,0-50.087,22.469-50.087,50.087s22.469,50.087,50.087,50.087S372.87,411.618,372.87,384 S350.401,333.913,322.783,333.913z M322.783,400.696c-9.206,0-16.696-7.49-16.696-16.696s7.49-16.696,16.696-16.696 c9.206,0,16.696,7.49,16.696,16.696S331.989,400.696,322.783,400.696z" /> </g> </g> <g> <g> <path d="M338.635,234.588c-6.519-6.52-17.091-6.52-23.611,0L173.357,376.255c-6.52,6.52-6.52,17.091,0,23.611 c3.26,3.26,7.533,4.891,11.805,4.891c4.272,0,8.546-1.629,11.805-4.891l141.667-141.667 C345.155,251.679,345.155,241.109,338.635,234.588z" /> </g> </g> <g> <g> <path d="M456.348,0H55.652c-9.22,0-16.696,7.475-16.696,16.696v478.609c0,5.787,2.996,11.161,7.918,14.202 c4.923,3.043,11.069,3.317,16.244,0.731l59.316-29.658l59.316,29.658c4.7,2.35,10.232,2.35,14.933,0L256,480.58l59.316,29.658 c2.35,1.175,4.909,1.762,7.466,1.762c2.558,0,5.117-0.588,7.466-1.762l59.316-29.658l59.316,29.658 c5.173,2.587,11.32,2.312,16.244-0.731c4.922-3.042,7.918-8.416,7.918-14.202V16.696C473.044,7.475,465.569,0,456.348,0z M439.652,468.29l-42.621-21.31c-4.7-2.35-10.232-2.35-14.933,0l-59.316,29.658l-59.316-29.658 c-2.35-1.175-4.909-1.762-7.466-1.762s-5.117,0.588-7.466,1.762l-59.316,29.658l-59.316-29.658c-4.7-2.35-10.232-2.35-14.933,0 l-42.621,21.31V33.391h367.304V468.29z" /> </g> </g> <g> <g> <path d="M389.565,66.783H189.218c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h200.348 c9.22,0,16.696-7.475,16.696-16.696S398.786,66.783,389.565,66.783z" /> </g> </g> <g> <g> <path d="M389.565,133.565H189.218c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h200.348 c9.22,0,16.696-7.475,16.696-16.696S398.786,133.565,389.565,133.565z" /> </g> </g> <g> <g> <circle cx="122.435" cy="83.478" r="16.696" /> </g> </g> <g> <g> <circle cx="122.435" cy="150.261" r="16.696" /> </g> </g> </g></svg>
        </CardDataStats>
        <CardDataStats title="Non-completed Orders" total={overview.nonCompletedOrders} rate="0.95%" bgColor='#FFABAB' levelDown>
        <svg width="22px" height="22px" viewBox="0 0 1024 1024" className="fill-primary dark:fill-white"  version="1.1" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M182.52 146.2h585.14v402.28h73.15V73.06H109.38v877.71h402.36v-73.14H182.52z" /><path d="M255.67 219.34h438.86v73.14H255.67zM255.67 365.63h365.71v73.14H255.67zM255.67 511.91H475.1v73.14H255.67zM731.17 584.97c-100.99 0-182.86 81.87-182.86 182.86s81.87 182.86 182.86 182.86c100.99 0 182.86-81.87 182.86-182.86s-81.87-182.86-182.86-182.86z m0 292.57c-60.5 0-109.71-49.22-109.71-109.71 0-60.5 49.22-109.71 109.71-109.71 60.5 0 109.71 49.22 109.71 109.71 0.01 60.49-49.21 109.71-109.71 109.71z" /><path d="M777.43 686.4l-46.26 46.25-46.26-46.25-38.78 38.78 46.26 46.26-46.26 46.26 38.78 38.78 46.26-46.25 46.26 46.25 38.79-38.78-46.26-46.26 46.26-46.26z" /></g></svg>

        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        <DeviceChart deviceData={device_breakdown} />
        <ProfitChart profit={profit} />
        <SalesRevenueChart />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        {/* <IndiaMap /> */}
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
