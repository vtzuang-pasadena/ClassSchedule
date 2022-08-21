import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <h1>College of the Northern California</h1>
      <nav
        className='thenav'
        style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}
      >
        <Link to='/create'>Create Class</Link>
        <Link to='/search'>Search Classes</Link>
        <Link to='/add'>Add Classes</Link>
        <Link to='/view'>View your Schedule</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
