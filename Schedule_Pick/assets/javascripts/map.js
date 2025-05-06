// 배너 정보
const places = [
    { name: "카페 야미", address: "경기도 성남시 중원구 무슨로", img: "./img/place-list-banner.png" },
    { name: "카페 라떼", address: "서울시 강남구 어딘가", img: "./img/place-list-banner.png" },
    { name: "카페 모카", address: "서울시 송파구 어디로", img: "./img/place-list-banner.png" },
    { name: "카페 아메", address: "경기도 수원시 무슨동", img: "./img/place-list-banner.png" },
    { name: "카페 바닐라", address: "서울시 마포구 무슨길", img: "./img/place-list-banner.png" },
    { name: "카페 카라멜", address: "경기도 용인시 무슨로", img: "./img/place-list-banner.png" }
];

let currentIndex = 0; // 현재 슬라이드의 시작 인덱스

function updatePlaceBanners() {
    // 배너 정보 초기화
    const banners = document.querySelectorAll('.place-list-banner');

    // 배너 정보 업데이트
    for (let i = 0; i < banners.length; i++) {
        const place = places[currentIndex + i];

        // 배너 정보 표시
        if (place) {
            banners[i].style.display = 'flex';
            banners[i].querySelector('.place-list-banner-img').src = place.img;
            banners[i].querySelector('.place-list-banner-title p').textContent = place.name;
            banners[i].querySelector('.place-list-banner-address p').textContent = place.address;
        } else {
            banners[i].style.display = 'none';
        }
    }
}

window.onload = function () {

    $('#more-btn').click(function() {
        alert('more-btn');
    });

    $('#search-btn').click(function() {
        alert('search-btn');
    });

    // 지도 컨테이너 생성
    let mapContainer = document.getElementById('map');

    // 지도 옵션 설정
    let mapOption = {
        // 지도 중심 좌표 설정
        center: new kakao.maps.LatLng(37.420215, 127.126876),

        // 지도 확대 레벨 설정 (숫자가 높을 수록 멀어짐)
        level: 3
    };

    // 지도 생성
    let map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 초기 마커 생성
    let marker = new kakao.maps.Marker({
        position: mapOption.center
    })

    // 마커 추가
    marker.setMap(map);

    // 클릭할 때마다 마커 위치 변경
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        let latlng = mouseEvent.latLng;

        // 마커 위치 변경
        marker.setPosition(latlng);
    });
    
    // 화살표 슬라이더 이벤트 연결
    document.querySelector('.slider-arrow.left').addEventListener('click', function() {
        if (currentIndex - 3 >= 0) {
            currentIndex -= 3;
            updatePlaceBanners();
        }
    });
    document.querySelector('.slider-arrow.right').addEventListener('click', function() {
        if (currentIndex + 3 < places.length) {
            currentIndex += 3;
            updatePlaceBanners();
        }
    });

    // 배너 정보 초기화
    updatePlaceBanners();
};
