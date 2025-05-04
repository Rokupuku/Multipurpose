window.onload = function () {

    kakao.maps.load(function () {
        alert("kakao.maps.load 시작");

        let mapContainer = document.getElementById('map');
        let mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        let map = new kakao.maps.Map(mapContainer, mapOption);
    });
};
