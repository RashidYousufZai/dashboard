import React, { useState } from "react";
import SourceIcon from "@mui/icons-material/Source";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SettingsInputHdmiIcon from "@mui/icons-material/SettingsInputHdmi";
import KeyIcon from "@mui/icons-material/Key";
import "./styles.css";
import { Button } from "@mui/material";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import Preferences from "./Preferences";
import ApiKey from "./ApiKey";
// import DataSources from "./DataSources";
// import Users from "./Users";
// import Teams from "./Teams";
// import Plugins from "./Plugins";
// import ApiKeys from "./ApiKeys";
// import ServiceAccounts from "./ServiceAccounts";

const Settings = () => {
  const tabs = [
    {
      name: "Data sources",
      icon: <SourceIcon />,
      component: <div>Data source</div>,
    },
    {
      name: "Users",
      icon: <PersonIcon />,
      component: <div>user source</div>,
    },
    {
      name: "Teams",
      icon: <GroupIcon />,
      component: <div>team source</div>,
    },
    {
      name: "Plugins",
      icon: <SettingsInputHdmiIcon />,
      component: <div>Plugins</div>,
    },
    {
      name: "Preferences",
      icon: <SettingsInputComponentIcon />,
      component: <Preferences />,
    },
    {
      name: "API keys",
      icon: <KeyIcon />,
      component: <ApiKey />,
    },
    {
      name: "Service accounts",
      icon: <PersonIcon />,
      component: <div>service source</div>,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="settingMain">
      <h2>Setting</h2>
      <div className="tabContainer">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            style={{
              color: "white",
              textTransform: "capitalize",
              borderBottom: activeTab === index ? "2px solid red" : "none",
            }}
            onClick={() => handleTabClick(index)}
          >
            <div>{tab.icon}</div>
            <p>{tab.name}</p>
          </Button>
        ))}
      </div>
      <div className="tabContent">{tabs[activeTab].component}</div>
    </div>
  );
};

export default Settings;
