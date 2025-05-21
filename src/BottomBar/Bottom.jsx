import * as React from 'react';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';

export default function SimpleBottomNavigation() {
    const navigate = useNavigate();
  

  return (
    <Box sx={{ width: '100vw', bgcolor:'black', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
    
      >
        <BottomNavigationAction onClick={() => navigate("/Home")} style={{ cursor: "pointer" }} label="Home" icon={<HomeIcon />} />
      </BottomNavigation>
    </Box>
  );
}