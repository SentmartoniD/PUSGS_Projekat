import { Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Register/Register'
import './components/Login/Login'
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
