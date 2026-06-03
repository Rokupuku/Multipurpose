import { Navigate, Route, Routes, Link, NavLink } from 'react-router-dom';
import './App.css';
import List1 from './pages/list1';
import List1Detail from './pages/list1Detail';
import List2 from './pages/list2';
import List2Detail from './pages/list2Detail';
import List3 from './pages/list3';
import List3Detail from './pages/list3Detail';
import List4 from './pages/list4';
import List4Detail from './pages/list4Detail';

function App() {
  return (
    <div className="App">
      <nav className="team-nav" aria-label="팀원 페이지">
        <NavLink to="/list1">이름1</NavLink>
        <NavLink to="/list2">이름2</NavLink>
        <NavLink to="/list3">이름3</NavLink>
        <NavLink to="/list4">이름4</NavLink>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/list1" replace />} />
          <Route path="/list1" element={<List1 />} />
          <Route path="/list1/:memberId" element={<List1Detail />} />
          <Route path="/list2" element={<List2 />} />
          <Route path="/list2/:memberId" element={<List2Detail />} />
          <Route path="/list3" element={<List3 />} />
          <Route path="/list3/:memberId" element={<List3Detail />} />
          <Route path="/list4" element={<List4 />} />
          <Route path="/list4/:memberId" element={<List4Detail />} />
          <Route
            path="*"
            element={
              <div className="page">
                <p className="empty">페이지를 찾을 수 없습니다.</p>
                <Link to="/list1">목록으로 이동</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
