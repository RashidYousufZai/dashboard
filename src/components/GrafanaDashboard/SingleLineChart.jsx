import React from "react";
import ReactApexChart from "react-apexcharts";

const SingleLineChart = ({ data }) => {
  const chartData = data.map((item) => ({
    x: new Date(item.time).getTime(),
    y: item.temp,
  }));

  const options = {
    series: [
      {
        name: "Temperature",
        data: chartData,
      },
    ],
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    title: {
      text: "Temperature Over Time",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      title: {
        text: "Temperature",
      },
      min: 5,
      max: 40,
      tickAmount: 5,
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value) {
          const date = new Date(value);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
        },
      },
    },
    tooltip: {
      x: {
        format: "HH:mm",
      },
      y: {
        formatter: function (val) {
          return `${val.toFixed(2)} °C`;
        },
      },
    },
  };

  return (
    <div id="chart" className="chartWrap">
      <ReactApexChart
        options={options}
        series={options.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default SingleLineChart;
