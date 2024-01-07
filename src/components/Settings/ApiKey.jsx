import React from "react";
import "./styles.css";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Button } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
const ApiKey = () => {
  return (
    <div className="apikeyMain">
      <div className="apiGenTop">
        <IconButton
          style={{
            background: "rgb(2, 117, 216)",
            borderRadius: "inherit",
          }}
        >
          <InfoIcon sx={{ color: "white" }} />
        </IconButton>
        <div className="apigenTopContent">
          <div>
            <p>Switch from Api keys to service accounts</p>
            <p>
              Each api key will be automatically migrated to service account
              with a token. This service account will be created with the same
              permission as Api key and current api keys will continue to work
              as they were.{" "}
            </p>
          </div>

          <Button
            style={{
              background: "#0275d8",
              border: "none",
              color: "white",
              height: "35px",
              textTransform: "capitalize",
              width: "250px",
            }}
          >
            Migrate to service accounts now
          </Button>
        </div>
      </div>
      <div className="apiGenBottom">
        <p>You have not added any api keys yet.</p>
        <Button
          style={{
            background: "#0275d8",
            color: "white",
            height: "35px",
            textTransform: "capitalize",
            //   width: "250px",
          }}
        >
          <KeyIcon sx={{ color: "white" }} />
          New Api key
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <RocketLaunchIcon />
          <p>
            Pro-Tip: Remember, you can provide view-only Api access to other
            applications
          </p>
        </div>
      </div>
    </div>
  );
};
export default ApiKey;
