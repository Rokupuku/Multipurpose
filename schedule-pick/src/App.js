import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Map from './components/Map';
import Group from './components/Group';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Schedule Pick
            </Typography>
            <Button color="inherit" component={Link} to="/map">
              지도
            </Button>
            <Button color="inherit" component={Link} to="/group">
              그룹
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/group" element={<Group />} />
          <Route path="/" element={<Map />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
