import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

interface PieChartData {
  data: { [emotion: string]: number };
}

const PieChart = ({ data }: PieChartData) => {
  const processData = (data: PieChartData['data']) => {
    const entries = Object.entries(data);
    let sortedData = entries.sort((a, b) => b[1] - a[1]);

    if (sortedData.length > 4) {
      let sum = 0;
      const others = sortedData.slice(4);
      others.forEach((item) => {
        sum += item[1];
      });
      sortedData = sortedData.slice(0, 4);
      sortedData.push(['Others', sum]);
    }

    const labels: string[] = [];
    const values: number[] = [];

    sortedData.forEach((item) => {
      labels.push(item[0]);
      values.push(item[1]);
    });

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#FEA013', '#69563A', '#BA4A0C', '#D23131', '#494949'],
        },
      ],
    };
  };

  const chartData = processData(data);

  console.log('chart data', chartData)
  return (
    <div className="w-full h-[300px]">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default React.memo(PieChart);
