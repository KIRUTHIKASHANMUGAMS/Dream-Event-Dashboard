import React from 'react';
import ReactApexChart from 'react-apexcharts';

function ApexChartComponent({ type, series, options, height = 350, width = '100%' }) {
  return (
    <div>
      <ReactApexChart
        type={type}
        series={series}
        options={options}
        height={height}
        width={width}
      />
    </div>
  );
}

export default ApexChartComponent;
