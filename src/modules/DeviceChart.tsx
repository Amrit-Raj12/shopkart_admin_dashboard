import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface DeviceChartProps {
    deviceData: {
        success: boolean;
        data: {
            _id: string;
            count: number;
        }[]
    } 
}

interface DeviceChartState {
  series: number[];
  labels: string[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
  legend: {
    show: false,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const DeviceChart: React.FC<DeviceChartProps> = ({ deviceData }) => {
  const [state, setState] = useState<DeviceChartState>({
    series: [],
    labels: [],
  });

  useEffect(() => {
    // Set the chart data from the device_breakdown
    const seriesData = deviceData.data.map((item) => item.count);
    const labelsData = deviceData.data.map((item) => item._id);

    setState({
      series: seriesData,
      labels: labelsData,
    });
  }, []);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Device Breakdown
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{ ...options, labels: state.labels }} // Set dynamic labels
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {state.labels.map((label, index) => (
          <div key={index} className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full ${
                  options.colors?.[index]
                }`}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{label}</span>
                <span>{`${Math.round(
                  (state.series[index] / state.series.reduce((a, b) => a + b, 0)) * 100
                )}%`}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceChart;
