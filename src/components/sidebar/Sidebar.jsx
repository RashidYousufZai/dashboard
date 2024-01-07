import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddAlertIcon from '@mui/icons-material/AddAlert';
export default function Sidebar() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
      {[
        { text: 'Home', icon: <HomeIcon /> },
        { text: 'Alert', icon: <AddAlertIcon /> },
      ].map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton>
            {item.icon}
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer('left', true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
