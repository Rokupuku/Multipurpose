import React, { useEffect } from 'react';
import FloatingBox from './FloatingBox';

function MapSection() {
  useEffect(() => {
    // 카카오맵 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=f0ac21061444c7f34a1c194e9d27e979";
    script.async = true;
    script.onload = () => {
      const kakao = window.kakao;
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(37.420215, 127.126876),
        level: 3
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const marker = new kakao.maps.Marker({ position: mapOption.center });
      marker.setMap(map);
      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        let latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
      });
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="map-container" style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: 'calc(100vh - 100px)', zIndex: 0 }}></div>
      <FloatingBox />
    </div>
  );
}

export default MapSection; 