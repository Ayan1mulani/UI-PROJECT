import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100vw', bgcolor:'black', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) navigate('/donate');
          if (newValue === 1) navigate('/');
          if (newValue ===2) navigate('/Cart');
          // Add more navigation if needed
        }}
      >
        <BottomNavigationAction label="Donate" icon={< VolunteerActivismIcon/>} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
      </BottomNavigation>
    </Box>
  );
}