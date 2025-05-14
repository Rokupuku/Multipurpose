import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Map = () => {
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청
        level: 3
      };
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    }
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim() || !map) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchQuery, (results, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(results[0].y, results[0].x);
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });
        map.setCenter(coords);
      }
    });
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'absolute', 
          top: 20, 
          left: 20, 
          zIndex: 1, 
          p: 2,
          display: 'flex',
          gap: 1
        }}
      >
        <TextField
          size="small"
          placeholder="장소 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          검색
        </Button>
      </Paper>
      <Box
        ref={mapRef}
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </Box>
  );
};

export default Map; 