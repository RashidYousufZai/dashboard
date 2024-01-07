/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { InfluxDB } from "@influxdata/influxdb-client";

const LineChart = ({ prevData,interval }) => {
  const [userDb, setUserDb] = useState([]);
  const [groups, setGroups] = useState([]);

  const tblSensorGroup = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await axios.get(
        "https://endpoint.careafox.com/api/list/tblSensorGroup",
        {
          headers: {
            "X-Authorization": `${token}`,
          },
        }
      );
      setGroups(res?.data.tblSensorGroup);
      console.log("tblSensorGroup", res?.data.tblSensorGroup);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const viewUserDb = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const userDbResponse = await axios.get(
        "https://endpoint.careafox.com/api/list/view_user_db",
        {
          headers: {
            "X-Authorization": `${token}`,
          },
        }
      );
      console.log("userDB", userDbResponse.data.view_user_db);

      const userDb = userDbResponse?.data?.view_user_db;

      if (userDb && userDb.length > 0) {
        const groupedDevices = groupDevicesByGroupId(userDb);
        const queryPromises = [];

        for (const groupId in groupedDevices) {
          const devices = groupedDevices[groupId];
          const groupQueryPromise = getGroupQueryPromise(devices);
          queryPromises.push(groupQueryPromise);
        }

        const allResults = await Promise.all(queryPromises);
        console.log("All results:", allResults);
        setUserDb(allResults);
      }

      return userDbResponse;
    } catch (err) {
      console.error(err);
    }
  };

  const groupDevicesByGroupId = (devices) => {
    const groupedDevices = devices.reduce((groups, device) => {
      const groupId = device.groupId;

      if (!groups[groupId]) {
        groups[groupId] = [];
      }

      groups[groupId].push(device);

      return groups;
    }, {});

    return groupedDevices;
  };

  const getGroupQueryPromise = async (devices) => {
    const queryPromises = devices.map((device) => {
      const { device_mac, influx_server_url, influx_token, influx_org } =
        device;

      const query = `
          from(bucket: "general")
          |> range(start:${prevData}, stop: -1s)
          |> filter(fn: (r) => r["_measurement"] == "mem")
          |> filter(fn: (r) => r["_field"] == "device_temperature")
          |> filter(fn: (r) => r["device_mac"] == "${device_mac}")
          |> aggregateWindow(every: 15m, fn: mean, createEmpty: false)
          |> yield(name: "mean")
        `;

      return new Promise(async (resolve, reject) => {
        try {
          const queryApi = await new InfluxDB({
            url: influx_server_url,
            token: influx_token,
          }).getQueryApi(influx_org);

          const resultData = [];

          await queryApi.queryRows(query, {
            next(row, tableMeta) {
              const o = tableMeta.toObject(row);
              resultData.push(o);
            },
            error(error) {
              console.log(`Query failed for device ${device_mac}:`, error);
              reject(error);
            },
            complete() {
              console.log(`Query completed for device ${device_mac}`);
              console.log(`Result data for device ${device_mac}:`, resultData);
              resolve({
                name: device_mac,
                data: resultData.map((data) => ({
                  x: new Date(data._time).toISOString(),
                  y: data._value,
                })),
              });
            },
          });
        } catch (error) {
          console.error(
            `Error in influxQuery for device ${device_mac}:`,
            error
          );
          reject(error);
        }
      });
    });

    return Promise.all(queryPromises);
  };

  useEffect(() => {
    const fetchData = async () => {
      await tblSensorGroup();
      await viewUserDb();
    };

    fetchData();

    // const fetchDataInterval = setInterval(fetchData, interval);

    // return () => clearInterval(fetchDataInterval);
  }, [prevData]);

  const seriesData = userDb ? userDb.flat() : [];

  const options = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      animations: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          selection: false,
          pan: false,
          reset: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "Average High & Low Temperature",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      min: new Date(seriesData[0]?.data[0]?.x).getTime(),
    },
    yaxis: {
      title: {
        text: "Temperature",
      },
      min: 1,
      max: 40,
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
      y: {
        formatter: function (value) {
          return value;
        },
      },
      shared: false,
    },
  };

  return (
    <div id="chart" className="chartWrap">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;



// http://fastapi.careafox.com:5000/rep