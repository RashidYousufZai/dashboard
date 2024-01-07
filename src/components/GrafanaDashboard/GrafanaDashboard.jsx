/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import Search from "../../assets/Search.svg";
import Sidebar from "../sidebar/Sidebar";
import HeatmapChart from "./HeatMap";
import CardChart from "./CardChart";
import "./styles.css";
import mqtt from "mqtt";
import SingleLineChart from "./SingleLineChart";
import axios from "axios";
import { InfluxDB } from "@influxdata/influxdb-client";
const GrafanaDashbaord = () => {
  const username = "admin";
  const password = "o99Y7YndJy0YwNlW3DkC9DZk0";
  const brokerUrl = "ws://tag4track.com:8083/mqtt";

  const [topic, setTopic] = useState([]);
  const [interval, setInterval] = useState("10s");
  const [prevdata,setPrevData] = useState("-9h")
  const token = localStorage.getItem("jwt");

  // const getUserDbToken = async () => {
  //   const token = localStorage.getItem("jwt");

  //   try {
  //     const res = await axios.get(
  //       "https://endpoint.careafox.com/api/list/user_db_token",
  //       {
  //         headers: {
  //           "X-Authorization": `${token}`,
  //         },
  //       }
  //     );

  //     console.log("user_db_token", res?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const tblLocations = async () => {
  //   const token = localStorage.getItem("jwt");

  //   try {
  //     const res = await axios.get(
  //       "https://endpoint.careafox.com/api/list/tblLocations",
  //       {
  //         headers: {
  //           "X-Authorization": `${token}`,
  //         },
  //       }
  //     );

  //     console.log("tblLocations", res?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const tblDeviceType = async () => {
  //   const token = localStorage.getItem("jwt");

  //   try {
  //     const res = await axios.get(
  //       "https://endpoint.careafox.com/api/list/tblDeviceType",
  //       {
  //         headers: {
  //           "X-Authorization": `${token}`,
  //         },
  //       }
  //     );

  //     console.log("tblDeviceType'", res?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const tblSubLocations = async () => {
  //   const token = localStorage.getItem("jwt");

  //   try {
  //     const res = await axios.get(
  //       "https://endpoint.careafox.com/api/list/tblSubLocations",
  //       {
  //         headers: {
  //           "X-Authorization": `${token}`,
  //         },
  //       }
  //     );

  //     console.log("tblSubLocations", res?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const deviceMac = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await axios.get(
        "https://endpoint.careafox.com/api/list/device_mac",
        {
          headers: {
            "X-Authorization": `${token}`,
          },
        }
      );

      console.log("device_mac", res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  // const deviceMacThreshold = async () => {
  //   const token = localStorage.getItem("jwt");

  //   try {
  //     const res = await axios.get(
  //       "https://endpoint.careafox.com/api/list/device_mac_threshold",
  //       {
  //         headers: {
  //           "X-Authorization": `${token}`,
  //         },
  //       }
  //     );

  //     console.log("device_mac_threshold", res?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // const client = mqtt.connect(brokerUrl, {
    //   clientId: "emqx_ODY3MD",
    //   username: username,
    //   password: password,
    // });

    // client.on("connect", () => {
    //   console.log("Connected to MQTT broker");
    //   const topic2 = "kbeacon/publish/94A408B91ABC";

    //   client.subscribe(topic2, (err) => {
    //     if (!err) {
    //       console.log(`Subscribed to topic: ${topic2}`);
    //     }
    //   });
    // });

    // client.on("message", (topic2, message) => {
    //   try {
    //     const parsedMessage = JSON.parse(message.toString());

    //     if (parsedMessage.obj) {
    //       // console.log(`Received message on topic ${topic2}:`, parsedMessage.obj);
    //       setTopic(parsedMessage.obj);
    //     } else {
    //       console.log(
    //         `Received message on topic ${topic2} does not contain an 'obj' property.`
    //       );
    //     }
    //   } catch (error) {
    //     console.error(`Error parsing message on topic ${topic2}:`, error);
    //   }
    // });

    // client.on("error", (err) => {
    //   console.error("MQTT error:", err);
    // });
    // // historicData()
    // getUserDbToken();
    // tblLocations();
    // tblDeviceType();
    // tblSubLocations();
    deviceMac();
    // deviceMacThreshold();

    return () => {
      // client.end();
    };
  }, []);
  return (
    <div className="grafanaMain">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Sidebar />
        <div className="search-Box">
          <img
            src={Search}
            alt="Search Icon"
            style={{
              marginLeft: "10px",
            }}
          />
          <input className="search-input" type="text" placeholder="Search" />
        </div>
        <div
          style={{
            visibility: "hidden",
          }}
        >
          <Sidebar />
        </div>
      </div>
      <div
        style={{
          dsiplay: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <div>
          <label htmlFor="timeInterval">Choose a time interval:</label>
          <select
            id="timeInterval"
            onChange={(e) => {
              setPrevData(e.target.value);
            }}
            value={prevdata}
          >
            <option value="-24h" selected={prevdata === "-9h"}>
              {prevdata === "-9h" ? "9 hours (default)" : "24 hours"}
            </option>
            <option value="-12h">12 hours</option>
            <option value="-6h">6 hours</option>
            <option value="-15m">15 minutes</option>
          </select>
        </div>

        <div>
          <label htmlFor="intervalSelect">Choose update interval:</label>
          <select
            id="intervalSelect"
            onChange={(e) => {
              const selectedInterval = parseInt(e.target.value);
              setInterval(selectedInterval);
            }}
            value={interval}
          >
            <option value={10000}>10 seconds</option>
            <option value={15000}>15 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={45000}>45 seconds</option>
            <option value={60000}>1 minute</option>
          </select>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {topic?.slice(0, 6).map((i, index) => (
            <div key={index}>
              <CardChart
                mac={i.dmac}
                temp={`${i.temp}°C`}
                humidity={`${i.humidty}%`}
                bgColor="#c26786"
                lineColor="#e8d3da"
                areaColor=" #e3b6c5"
                sampleData={[
                  [26, 30.95],
                  [76, 22.34],
                  [45, 12.18],
                ]}
              />
            </div>
          ))}
        </div>
        <div>
          <LineChart prevData={prevdata} interval={interval} />
        </div>
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <HeatmapChart />
        </div>
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <SingleLineChart data={topic} />
        </div>
      </div>
    </div>
  );
};
export default GrafanaDashbaord;
