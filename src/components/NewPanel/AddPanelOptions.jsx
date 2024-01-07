import React from "react";
import "./styles.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import WrapTextIcon from '@mui/icons-material/WrapText';
const AddPanelOptions = ({closeBtn}) => {
  return (
    <div className="addPanelBox">
      <div className="tabssMain">
        <p>Add Panel</p>

        <IconButton onClick={closeBtn}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="addPanelOptionWrap">
        <div className="addPanelSingleOption">
          <ContentPasteIcon />
          <p>Add a new Panel</p>
        </div>
        <div className="addPanelSingleOption">
          <WrapTextIcon />
          <p>Add a new row</p>
        </div>
      </div>

      <div className="addPanelOptionWrap">
        <div className="addPanelSingleOption">
          <MenuBookIcon />
          <p>Add a panel from the library</p>
        </div>
        <div className="addPanelSingleOption">
          <ContentPasteIcon />
          <p>Paste panel from clipboard</p>
        </div>
      </div>
    </div>
  );
};
export default AddPanelOptions;
