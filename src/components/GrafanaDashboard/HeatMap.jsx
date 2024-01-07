import React from "react";
import ReactApexChart from "react-apexcharts";

const HeatmapChart = () => {
  const options = {
    chart: {
      height: 350,
      type: "heatmap",
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      heatmap: {
        radius: 0,
        enableShades: false,
        colorScale: {
            ranges: [
              {
                from: 0,
                to: 20,
                color: '#FF5722',
              },
              {
                from: 21,
                to: 50,
                color: '#FFC107',
              },
              {
                from: 51,
                to: 100,
                color: '#4CAF50', // Green color
              },
            ],
          }
          
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
      },
    },
    xaxis: {
      type: "category",
    },
    title: {
      text: "Condition Monitor",
    },
  };

  const generateData = (count, options) => {
    const { min, max } = options;
    const data = [];

    for (let i = 0; i < count; i++) {
      const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
      data.push(randomValue);
    }

    return data;
  };

  const series = [
    {
      name: "Metric1",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric2",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric3",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric4",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric5",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric6",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric7",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric8",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "Metric8",
      data: generateData(20, {
        min: 0,
        max: 90,
      }),
    },
  ];

  return (
    <div className="chartWrap" id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={350}
      />
    </div>
  );
};

export default HeatmapChart;
