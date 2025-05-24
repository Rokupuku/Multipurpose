import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Group from './grouppage/Group';
import './App.css';
import logoImage from './assets/images/SchedulePicklogo.png';
import userImage from './assets/images/user.png';

function AppContent() {
  const user = { name: '사용자' }; // 임시 사용자 데이터
  const navigate = useNavigate();

  const getPageTitle = () => {
    return `안녕하세요, ${user.name}님!`;
  };

  return (
    <div id="wrap">
      <header className="header">
        {/* 로고 */}
        <div onClick={() => navigate('/home')} className="logo">
          <img className="logoimg" src={logoImage} alt="로고" />
        </div>

        {/* 네비게이션 버튼 */}
        <div className="nav">
          <div className="nav-item">
            <Link to="/calendar" className="nav-button">내 캘린더</Link>
          </div>
          <div className="nav-item">
            <button className="nav-button">지도</button>
          </div>
          <div className="nav-item">
             <Link to="/friends" className="nav-button">친구페이지</Link>
          </div>
          <div className="nav-item">
            <Link to="/mypage" className="nav-button">마이페이지</Link>
          </div>
        </div>

        {/* 사용자 정보 */}
        <div className="info">
          <p className="hi">{getPageTitle()}</p>
          <img
            className="oiai"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICre5RHZl6U3gRPYWpYElPBkWu75otqfQIA&s"
            alt="프로필"
          />
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
