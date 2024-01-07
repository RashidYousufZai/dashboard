import React from "react";
import ReactApexChart from "react-apexcharts";
import AirIcon from "@mui/icons-material/Air";
const CardChart = ({
  mac,
  temp,
  bgColor,
  sampleData,
  lineColor,
  areaColor,
  humidity,
}) => {
  const options = {
    series: [
      {
        name: "XYZ MOTORS",
        data: sampleData,
      },
    ],
    chart: {
      type: "area",
      stacked: false,
      // height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
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
      colors: [areaColor], // Set the area color here
    },
    yaxis: {
      show: false, // Hide Y-axis labels
    },
    xaxis: {
      labels: {
        show: false, // Hide X-axis labels
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
    stroke: {
      width: 2,
      colors: [lineColor], // Set the line color here
    },
  };

  return (
    <div
      style={{
        width: "220px",
      }}
    >
      <button
        style={{
          width: "220px",
        }}
      >
        Device_mac
      </button>
      <div
        className="chartWrap"
        style={{ background: bgColor, height: "400px" }}
      >
        <div
          style={{
            padding: "5px",
          }}
        >
          <p
            style={{
              fontSize: "25px",
              fontWeight: 400,
            }}
          >
            {mac}
          </p>
          <p
            style={{
              fontSize: "40px",
              fontWeight: 600,
            }}
          >
            {temp}
          </p>
        </div>
        <div
          style={{
            padding: "5px",
          }}
        >
          <AirIcon sx={{ color: "white", fontSize: "50px" }} />
          <p
            style={{
              fontSize: "25px",
              fontWeight: 400,
              color: "white",
            }}
          >
            {humidity}
          </p>
        </div>

        <div id="chart">
          <ReactApexChart
            options={options}
            series={options.series}
            type="area"
            // height={options.chart.height}
          />
        </div>
      </div>
      <button
        style={{
          width: "220px",
        }}
      >
        QUEUE
      </button>
      <button
        style={{
          width: "220px",
        }}
      >
        CONFIGURATION
      </button>
    </div>
  );
};

export default CardChart;
