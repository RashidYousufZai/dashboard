import React, { useState } from "react";
import "./styles.css";
import Sidebar from "../sidebar/Sidebar";
import GridViewIcon from "@mui/icons-material/GridView";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SendIcon from "@mui/icons-material/Send";
import AddPanelOptions from "./AddPanelOptions";
import { Button, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LanguageIcon from "@mui/icons-material/Language";
import BuildIcon from "@mui/icons-material/Build";
import ProjectTitle from "./ProjectTitle";
const NewPanel = () => {
  const [addNewPanel, setAddNewPanel] = useState(false);
  const addnewPanel = () => {
    setAddNewPanel(true);
  };
  const CloseAddPanel = () => {
    setAddNewPanel(false);
  };
  return (
    <div className="newPanelWrapper">
      <Sidebar />
      <div className="NewPanelMain">
        <div className="tabssMain">
          <div className="tabCom">
            <GridViewIcon />
            <p>General /</p>
            <p> Ankit</p>
            <StarBorderIcon />
            <SendIcon />
          </div>
          <div className="tabCom">
            <Button onClick={addnewPanel}>Add panel</Button>
            <IconButton>
              <SaveIcon />
            </IconButton>
            <IconButton>
              <LanguageIcon />
            </IconButton>
            <IconButton>
              <BuildIcon />
            </IconButton>
          </div>
        </div>
        <div className="contentBox">
          {addNewPanel === true ? (
            <AddPanelOptions closeBtn={CloseAddPanel} />
          ) : (
            ""
          )}
          <ProjectTitle />
          <ProjectTitle />
        </div>
      </div>
    </div>
  );
};
export default NewPanel;
