import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, Route, Routes } from "react-router-dom";
import Notifications from "./pages/Notifications";

const drawerWidth = 240;
const routes = [
  {
    path: "notifications",
    title: "Notifications",
  },
];

const App = () => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          nrich
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {routes.map((menuItem) => (
            <ListItem key={menuItem.path} disablePadding>
              <ListItemButton component={Link} to={menuItem.path}>
                <ListItemText primary={menuItem.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, m: 2 }}>
      <Toolbar />
      <Routes>
        <Route path="notifications" element={<Notifications />} />
      </Routes>
    </Box>
  </Box>
);

export default App;
