import { Route, Routes } from 'react-router';
import './App.css';
import Longitudinal from './pages/Longitudinal/Longitudinal';
import Transverse from './pages/Transverse/Transverse';
import Loads from './pages/Loads/Loads';

function App() {
  return (
    <div className="App">
      <header>RC Frame</header>
      <Routes>
        <Route path='/' element={<Longitudinal />} />
        <Route path='/longitudinal' element={<Longitudinal />} />
        <Route path='/transverse' element={<Transverse />} />
        <Route path='/loads' element={<Loads />} />
      </Routes>
    </div>
  );
}

export default App;