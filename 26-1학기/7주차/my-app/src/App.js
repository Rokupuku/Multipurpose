import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import List1 from './pages/list1';
import List2 from './pages/list2';
import List3 from './pages/list3';
import List4 from './pages/list4';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="App-nav">
          <Link to="/list1">
            이름1
          </Link>
          <Link to="/list2">
            이름2
          </Link>
          <Link to="/list3">
            이름3
          </Link>
          <Link to="/list4">
            이름4
          </Link>
        </nav>
        <Routes>
          <Route path="/list1" element={<List1 />} />
          <Route path="/list2" element={<List2 />} />
          <Route path="/list3" element={<List3 />} />
          <Route path="/list4" element={<List4 />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
