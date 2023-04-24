import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import {Outlet} from 'react-router-dom';


export function Layout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                To Do App
              </Typography>
          </Toolbar>
        </AppBar>
        <Outlet />
    </Box>
  );
}
