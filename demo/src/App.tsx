/*
 *    Copyright 2022 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import FormConfiguration from "./pages/FormConfiguration";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";

const drawerWidth = 240;
const routes = [
  {
    path: "notifications",
    title: "Notifications",
  },
  {
    path: "form-configuration",
    title: "Form Configuration",
  },
  {
    path: "search",
    title: "Search",
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
        <Route path="form-configuration" element={<FormConfiguration />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </Box>
  </Box>
);

export default App;
