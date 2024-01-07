/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Card from "./Card";
import SampleUser from "../../assets/SampleUser.png";
import SampleBg from "../../assets/SampleBg.svg";
import DetailCard from "./DetailCard";
import Search from "../../assets/Search.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { InfluxDB } from "@influxdata/influxdb-client";
import Modal from "@mui/material/Modal";
import Map from "./Map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [mappedGroups, setMappedGroups] = useState([]);
  const [userDb, setUserDb] = useState([]);
  const [deviceMacs, setDeviceMacs] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const token = localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);

  const [filteredData, setFilteredData] = useState([]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "10px",
    height: "80vh",
    width: "500px",
  };

  const tblSensorGroup = async () => {
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

      console.log("device_mac", res?.data?.device_mac);
      setDeviceMacs(res?.data?.device_mac);
    } catch (err) {
      console.log(err);
    }
  };
  const viewUserDb = async () => {
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
      setUserDb(userDbResponse.data.view_user_db);
    } catch (err) {
      return err;
    }
  };
  const getGroupQueryPromise = async (devices) => {
    const queryPromises = userDb.map((device) => {
      const { device_mac, influx_server_url, influx_token, influx_org } =
        device;

      const query = `
          from(bucket: "general")
          |> range(start:-15m, stop: -1s)
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
              // console.log('Result data:', resultData); // Add this line for debugging
              const updatedData = resultData.map((data) => ({
                x: new Date(data._time).toISOString(),
                y: data._value,
                start: data._start,
                stop: data.stop,
                time: data._time,
              }));

              setData((prevData) => [
                ...prevData,
                {
                  name: device_mac,
                  data: updatedData,
                },
              ]);

              resolve({
                name: device_mac,
                data: updatedData,
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

  const updateMappedGroups = () => {
    const onlineDevices = new Set();
    const onlineDeviceMacs = new Set();
//  deviceMac()
    getGroupQueryPromise().then((results) => {
      results.forEach((result) => {
        if (result.data.length > 0) {
          onlineDevices.add(result.name);
          result.data.forEach((device) => {
            onlineDeviceMacs.add(device.device_mac);
          });
        }
      });

      const updatedMappedGroups = groups.map((group) => {
        const deviceMac = deviceMacs.filter(
          (device) => device.group_id === group.id
        ) 
        const devicesInGroup = userDb.filter(
          (device) => device.group_id=== group.id
        );

        const onlineCount = devicesInGroup.filter((device) =>
          onlineDevices.has(device.device_mac)
        ).length;
        const offlineCount = devicesInGroup.length - onlineCount;

        return {
          group,
          deviceCount: devicesInGroup.length,
          onlineCount,
          offlineCount,
          devices: devicesInGroup,
          temperature: data,
          deviceMacs: deviceMac,
        };
      });

      setMappedGroups(updatedMappedGroups);
      setDeviceMacs(Array.from(onlineDeviceMacs));

      console.log("Updated Mapped Groups:", updatedMappedGroups);
    });
  };

  const getRandomTemperature = () => {
    const minTemperature = 4;
    const maxTemperature = 20;
    const randomTemperature =
      Math.random() * (maxTemperature - minTemperature) + minTemperature;
    return randomTemperature.toFixed(2);
  };
  const getRandomHumidity = () => {
    const minHumidity = 65;
    const maxHumidity = 99;

    const isDecimal = Math.random() < 0.3;

    if (isDecimal) {
      const randomHumidity =
        Math.random() * (maxHumidity - minHumidity) + minHumidity;
      return randomHumidity.toFixed(2);
    } else {
      const randomWholeNumber =
        Math.floor(Math.random() * (maxHumidity - minHumidity + 1)) +
        minHumidity;
      return randomWholeNumber.toString();
    }
  };




  //hulk happy

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  const handleButtonClick = () => {
    if (date && endDate) {
      const formattedStartDate = formatDate(new Date(date));
      const formattedEndDate = formatDate(new Date(endDate));  
      const filteredGroups = mappedGroups.map((group) => {
        const filteredDeviceMacs = group.deviceMacs.filter((device) => {
          const deviceDate = new Date(device.last_updated);
          return deviceDate >= new Date(formattedStartDate) && deviceDate <= new Date(formattedEndDate);
        });
  
        return {
          ...group,
          deviceMacs: filteredDeviceMacs
        };
      });
    
      setMappedGroups(filteredGroups);
    } else {
      console.log("Zahab nally khapa krwa");
    }
  };
  
  

  //hulk sad

  useEffect(() => {
    tblSensorGroup();
    deviceMac();
    viewUserDb();
  }, []);
  useEffect(() => {
    updateMappedGroups();
  }, [userDb]);

  return (
    <>
      <div className="dashboardMain">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <div className="search-container">
            <img src={Search} alt="Search Icon" />
            <input className="search-input" type="text" placeholder="Search" />
          </div>
          <div>
            <button
              style={{
                padding: "5px",
                borderRadius: "5px",
                color: "white",
                width: "120px",
                fontSize: "17px",
                background: "#2a7e8d",
              }}
              onClick={handleOpen}
            >
              Generate Pdf
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <DatePicker
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy "
            wrapperClassName="datePicker"
            onChange={(date) => {
              setDate(date);
            }}
            value={date}
          />
          <DatePicker
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            wrapperClassName="datePicker"
            onChange={(date) => {
              setEndDate(date);
            }}
            value={endDate}
          />
        </div>

        <button
          onClick={() => {
            console.log("date", date);
            console.log("date",endDate);
            handleButtonClick();
          }}
        >
          hi
        </button>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className="cardsWrapper">
            <div className="cardGrid">
              <Card
                bgImg={SampleBg}
                name="Haris"
                time="9999"
                ProfileImg={SampleUser}
                Loc="Jaipur"
              />
              <Card
                bgImg={SampleBg}
                name="Haris"
                time="9999"
                ProfileImg={SampleUser}
                Loc="Jaipur"
              />
              <Card
                bgImg={SampleBg}
                name="Haris"
                time="9999"
                ProfileImg={SampleUser}
                Loc="Jaipur"
              />
            </div>
            <Map />
            {mappedGroups?.map((group, index) => (
              <div key={index + 2}>
                <p
                  key={index}
                  style={{
                    background: "black",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {group.group.groupName}
                </p>
                <div className="cardGrid">
                  {group?.deviceMacs
                    ?.slice(0, group.onlineCount)
                    ?.map((device, index) => (
                      <DetailCard
                        key={index}
                        deviceNo={device.device_mac}
                        city={"Nerul"}
                        Ip={device.device_name}
                        temp={getRandomTemperature()}
                        humidity={getRandomHumidity()}
                        ProfileImg={SampleUser}
                        status="Active"
                        lastSeen={
                          device.last_updated
                            ? new Date(device.last_updated).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Not available"
                        }
                        time={
                          device.last_updated
                            ? new Date(device.last_updated).toLocaleTimeString(
                                "en-US",
                                {
                                  timeZone: "Asia/Kolkata", // Set the time zone to GMT+5:30
                                  hour12: false, // Use 24-hour format
                                }
                              )
                            : "Not available"
                        }
                      />
                    ))}
                </div>
                 {/* <div className="cardGrid">
                 {group.deviceMacs?.map((device, idx) => (
              <DetailCard
                key={idx}
                deviceNo={device.device_mac}
                city={device.location_name}
                Ip={device.device_name}
                temp={getRandomTemperature()}
                humidity={getRandomHumidity()}
                ProfileImg={SampleUser}
                status="Active"
                lastSeen={device.last_updated ? new Date(device.last_updated).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "Not available"}
                time={device.last_updated ? new Date(device.last_updated).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false }) : "Not available"}
              />
            ))}
          </div> */}
              </div>
            ))}
          </div>

          <div className="sideCard">
            {mappedGroups?.map((i, index) => (
              <div className="sideCardContentWrapper" key={index}>
                <p>{i?.group?.groupName}</p>
                <div className="sideCarddetailWrap">
                  <div className="spaceBet">
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "white",
                      }}
                    >
                      Online
                    </p>
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "#D9DBE9",
                      }}
                    >
                      {i.onlineCount}
                    </p>
                  </div>
                  <div className="spaceBet">
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "white",
                      }}
                    >
                      Offline
                    </p>
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "#D9DBE9",
                      }}
                    >
                      {i.offlineCount}
                    </p>
                  </div>
                  <div className="spaceBet">
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "white",
                      }}
                    >
                      Breaches
                    </p>
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "#D9DBE9",
                      }}
                    >
                      340
                    </p>
                  </div>
                  <div className="spaceBet">
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "white",
                      }}
                    >
                      Alerts
                    </p>
                    <p
                      className="sidecardContentTypo"
                      style={{
                        color: "#D9DBE9",
                      }}
                    >
                      234
                    </p>
                  </div>
                </div>
                <div className="circularbarWrap">
                  <div className="barAndTypoWrap">
                    <CircularProgressbar
                      value="22"
                      text="22"
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: "butt",
                        textSize: "24px",
                        pathTransitionDuration: 0.5,
                        pathColor: `#287287B`,
                        textColor: "white",
                        trailColor: "#ED2E7E",
                      })}
                    />
                    <p>RACK1</p>
                  </div>
                  <div className="barAndTypoWrap">
                    <CircularProgressbar
                      value="22"
                      text="22"
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: "butt",
                        textSize: "24px",
                        pathTransitionDuration: 0.5,
                        pathColor: "white",
                        textColor: "white",
                        trailColor: "#6E7191",
                      })}
                    />
                    <p>RACK2</p>
                  </div>
                  <div className="barAndTypoWrap">
                    <CircularProgressbar
                      value="22"
                      text="22"
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: "butt",
                        textSize: "24px",
                        pathTransitionDuration: 0.5,
                        pathColor: "white",
                        textColor: "white",
                        trailColor: "#6E7191",
                      })}
                    />
                    <p>LOWER DECK</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                // alignItems: "center",
                gap: "20px",
                flexDirection: "column",
              }}
            >
              <input
                style={{
                  height: "2.5em",
                }}
              />
              <lable>To:</lable>
              <input
                type="date"
                style={{
                  height: "2.5em",
                }}
              />
              <lable>From:</lable>
              <input
                type="date"
                style={{
                  height: "2.5em",
                }}
              />
              <select
                id="fruitSelector"
                name="fruits"
                style={{
                  height: "2.5em",
                }}
                value=""
              >
                <option value="apple">Bc45uwhbw7w</option>
                <option value="banana">Bc6ggwtwh</option>
                <option value="orange">vg67890oi99</option>{" "}
              </select>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
              }}
            >
              <button
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  color: "white",
                  width: "120px",
                  fontSize: "17px",
                  background: "#2a7e8d",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Dashboard;