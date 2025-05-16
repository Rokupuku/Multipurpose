import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Group from './components/Group';
import './App.css';
import logoImage from './assets/images/SchedulePicklogo.png';
import userImage from './assets/images/user.png';

function App() {
  const user = { name: '사용자' }; // 임시 사용자 데이터

  return (
    <Router>
      <div id="wrap">
        <header>
          <div className="logo">
            <img className="logoimg" src={logoImage} alt="로고" />
          </div>
          <div className="nav">
            <nav>
              <ul>
                <li><Link to="/calendar">내 캘린더</Link></li>
                <li><Link to="/map">지도</Link></li>
                <li><Link to="/friends">친구</Link></li>
                <li><Link to="/mypage">마이페이지</Link></li>
              </ul>
            </nav>
          </div>
          <div className="info">
            <p className="hi">안녕하세요. {user.name} 님!</p>
            <img className="oiai" src={userImage} alt="yaong" />
          </div>
        </header>

        <Routes>
          <Route path="/calendar" element={<div>캘린더 페이지</div>} />
          <Route path="/map" element={<div>지도 페이지</div>} />
          <Route path="/friends" element={<Group />} />
          <Route path="/mypage" element={<div>마이페이지</div>} />
          <Route path="/" element={<div>홈 페이지</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
