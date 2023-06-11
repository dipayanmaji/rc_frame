import { Route, Routes } from 'react-router';
import './App.css';
import Longitudinal from './pages/Longitudinal/Longitudinal';
import Transverse from './pages/Transverse/Transverse';
import Loads from './pages/Loads/Loads';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <>
      <header className='page-heading'>RC Frame</header>
      <nav className='navigation'>
        <NavLink to={'/'}>Longitudinal</NavLink>
        <NavLink to={'/transverse'}>Transverse</NavLink>
        <NavLink to={'/loads'}>Loads</NavLink>
      </nav>

      <div className="App">
        <Routes>
          <Route path='/' element={<Longitudinal />} />
          <Route path='/transverse' element={<Transverse />} />
          <Route path='/loads' element={<Loads />} />
        </Routes>
      </div>
    </>
  );
}

export default App;