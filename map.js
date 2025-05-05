window.onload = function () {

    let mapContainer = document.getElementById('map');
    let mapOption = {
        center: new kakao.maps.LatLng(37.420215, 127.126876),
        level: 3
    };

    let map = new kakao.maps.Map(mapContainer, mapOption);
};
