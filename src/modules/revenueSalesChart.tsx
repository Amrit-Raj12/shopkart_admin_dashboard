import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { revenue_sales } from '../data/dummyData';


const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [], // This will be dynamically updated
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 2000, // Adjusted based on data
    },
  };

  interface RevenueSale {
    _id: string;
    totalSales: number;
  }
  
  interface SalesRevenueChartState {
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[]; // For dynamic x-axis categories
  }
  
  const SalesRevenueChart: React.FC = () => {
    const [state, setState] = useState<SalesRevenueChartState>({
      series: [
        {
          name: 'Total Sales',
          data: [],
        },
      ],
      categories: [],
    });
  
    const [filter, setFilter] = useState('Week'); // Default filter is Week
  
    const getFilteredData = (filter: string) => {
      const currentDate = new Date();
      let filteredData: RevenueSale[] = [];
  
      // Filter data based on the selected filter type
      if (filter === 'Week') {
        // Show the last 7 days of data
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        filteredData = revenue_sales.data.filter(item => new Date(item._id) >= sevenDaysAgo);
      } else if (filter === 'Month') {
        // Show the last 30 days of data
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);
        filteredData = revenue_sales.data.filter(item => new Date(item._id) >= thirtyDaysAgo);
      }
  
      return filteredData;
    };
  
    useEffect(() => {
      // Initially load the data for the "Week" filter
      const filteredData = getFilteredData('Week');
      setState({
        series: [
          {
            name: 'Total Sales',
            data: filteredData.map(item => item.totalSales),
          },
        ],
        categories: filteredData.map(item => item._id),
      });
    }, []);
  
    const handleFilterChange = (selectedFilter: string) => {
      setFilter(selectedFilter);
  
      // Get filtered data based on the selected filter
      const filteredData = getFilteredData(selectedFilter);
  
      // Update the chart data state
      setState({
        series: [
          {
            name: 'Total Sales',
            data: filteredData.map(item => item.totalSales),
          },
        ],
        categories: filteredData.map(item => item._id),
      });
    };
  
    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex w-full flex-wrap gap-3 sm:gap-5">
            <div className="flex min-w-47.5">
              <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-primary">Total Revenue</p>
                <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
              </div>
            </div>
            <div className="flex min-w-47.5">
              <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-secondary">Total Sales</p>
                <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-45 justify-end">
            <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
              <button
                className={`rounded py-1 px-3 text-xs font-medium text-black ${filter === 'Week' ? 'bg-white' : 'hover:bg-white'}`}
                onClick={() => handleFilterChange('Week')}
              >
                Week
              </button>
              <button
                className={`rounded py-1 px-3 text-xs font-medium text-black ${filter === 'Month' ? 'bg-white' : 'hover:bg-white'}`}
                onClick={() => handleFilterChange('Month')}
              >
                Month
              </button>
            </div>
          </div>
        </div>
  
        <div>
          <div id="chartOne" className="-ml-5">
            <ReactApexChart
              options={{ ...options, xaxis: { categories: state.categories } }}
              series={state.series}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    );
};

export default SalesRevenueChart;

