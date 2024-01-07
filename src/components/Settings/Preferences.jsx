import React from "react";
import "./styles.css";
import { Button } from "@mui/material";

const Preferences = () => {
  return (
    <div className="preferMain">
      <div className="preferTopSec">
        <h3>Organization Profile</h3>
        <div>
          <p className="labelss">Organization name</p>
          <input className="fields" />
        </div>

        <Button>Update organization name</Button>
      </div>
      <div className="preferbottom">
        <h3>Preferences</h3>
        <div>
          <p className="labelss">Ui theme</p>
          <div className="checkWrap">
            <input type="radio" id="light" name="theme" value="light" />
            <p for="light">Light</p>

            <input type="radio" id="dark" name="theme" value="dark" />
            <p for="dark">Dark</p>

            <input type="radio" id="system" name="theme" value="system" />
            <p for="system">System</p>
          </div>
        </div>
        <div>
          <p className="labelss">Home Dashboard</p>
          <select className="fields">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="grape">Grape</option>
            <option value="orange">Orange</option>
          </select>
        </div>
        <div>
          <p className="labelss">Time Zone</p>
          <select className="fields">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="grape">Grape</option>
            <option value="orange">Orange</option>
          </select>
        </div>
        <div>
          <p className="labelss">Week start</p>
          <select className="fields">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="grape">Grape</option>
            <option value="orange">Orange</option>
          </select>
        </div>
        <div>
          <p className="labelss">Language</p>
          <select className="fields">
            <option value="English">English</option>
            <option value="Urdu">Urdu</option>
          </select>
        </div>
        <Button
          style={{
            background: "#0275d8",
            border: "none",
            color: "white",
            width:"100px",
            height:"25px",
            textTransform:"capitalize"
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default Preferences;
