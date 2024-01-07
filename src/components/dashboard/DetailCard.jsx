import React from "react";
import "./styles.css";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import ShareButton from "../../assets/Share Button.svg";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const DetailCard = ({
  deviceNo,
  status,
  Ip,
  temp,
  humidity,
  lastSeen,
  Loc,
  city,
  time,
  address,
  ProfileImg,
}) => {
  return (
    <div className="detailCardMain">
      <div className="upperDetailBox">
        <div className="progress">
          <CircularProgressWithLabel value={99} />
        </div>
        <div className="detailsbox">
          <div className="spaceBet">
            <p className="devicename">Device No: {deviceNo}</p>
            <Chip
              label={status}
              sx={{
                background: "#DFFFF6",
                color: "#00966D",
              }}
            />
          </div>
          <p>{Ip}</p>
          <div className="weatherDetailWrap">
            <div className=" spaceBet">
              <p
                className="tempTitle"
                style={{
                  color: "#287287",
                }}
              >
                TEMP
              </p>
              <p
                style={{
                  color: "#461694",
                }}
                className="tempTitle"
              >
                {temp}
              </p>
            </div>
            <div className=" spaceBet">
              <p
                className="tempTitle"
                style={{
                  color: "#287287",
                }}
              >
                HUMIDITY
              </p>
              <p
                style={{
                  color: "#461694",
                }}
                className="tempTitle"
              >
                {humidity}
              </p>
            </div>
            <div className=" spaceBet">
              <p
                className="tempTitle"
                style={{
                  color: "#287287",
                }}
              >
                Last Seen:
              </p>
              <p
                style={{
                  color: "#461694",
                }}
                className="tempTitle"
              >
                {lastSeen}
              </p>
            </div>
          </div>
          <p
            style={{
              color: "#BCA4FF",
              fontSize: "7px",
              fontWeight: 400,
            }}
          >
            Location
          </p>
          <p
            style={{
              color: "#6E7191",
              fontSize: "10px",
              fontWeight: 400,
            }}
          >
            {Loc}
          </p>
        </div>
      </div>
      <div className="detailLowerBox">
        <div>
          <p className="cardTitleTypo">{city}</p>
          <p className="cardTime">{time}</p>
          <p className="cardLoc">{address}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <IconButton>
            <img src={ShareButton} alt="ShareButton" />
          </IconButton>
          <img
            src={ProfileImg}
            alt="ProfileImg"
            style={{
              width: "42.759px",
              height: "40.138px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default DetailCard;
