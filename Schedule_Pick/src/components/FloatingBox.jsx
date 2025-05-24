import React from 'react';

function FloatingBox() {
  // 예시 데이터
  const users = [
    { name: '경기도 수원시 어디구 무슨로 9-2', icon: 'bus.png' },
    { name: '경기도 용인시 무슨구 여기로 90-2', icon: 'bus.png' },
    { name: '경기도 용인시 무슨구 여기로 90-2', icon: 'bus.png' }
  ];
  const timeline = [
    {
      title: '경기도 수원시 어디구 무슨로 9-2 출발',
      desc: '무슨동 주민센터 승차',
      detail: '버스 123번'
    },
    {
      title: '여기아파트, 이마트 승차',
      desc: '버스 32423'
    }
  ];

  return (
    <div className="map-floating-box">
      <div className="floating-header">
        <span>약속 장소 찾기</span>
      </div>
      <div className="floating-users">
        {users.map((user, idx) => (
          <div className="floating-user" key={idx}>
            <img src="/assets/images/user.png" className="user-icon" alt="user" />
            <span className="user-address">{user.name}</span>
            <img src={`/assets/images/${user.icon}`} className="transport-icon" alt="bus" />
          </div>
        ))}
      </div>
      <button className="more-btn">3명 더보기</button>
      <button className="find-place-btn">약속 장소 찾기</button>
      <div className="floating-timeline">
        <div className="timeline-users">
          {users.map((_, idx) => (
            <img src="/assets/images/user.png" className="timeline-user" alt="user" key={idx} />
          ))}
        </div>
        <div className="timeline-list">
          {timeline.map((item, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-desc">{item.desc}</div>
                {item.detail && <div className="timeline-detail">{item.detail}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="floating-bottom-btns">
        <button className="back-btn">뒤로</button>
        <button className="done-btn">완료</button>
      </div>
    </div>
  );
}

export default FloatingBox; 