import { Route, Routes, Link } from 'react-router-dom';
import './styles/style.css';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:memberId" element={<DetailPage />} />
      <Route
        path="*"
        element={
          <div className="App">
            <main className="app-main page">
              <p className="empty">페이지를 찾을 수 없습니다.</p>
              <Link to="/">목록으로 이동</Link>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
