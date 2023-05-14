import { Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Register/Register'
import './components/Login/Login'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* <Route element={<RequireAuth allowedRoles={["admin", "buyer", "seller"]} />} > */}
      <Route path='/home' element={<Dashboard />}>
        {/* <Route element={<RequireAuth allowedRoles={["admin", "buyer", "seller"]} />} >*/}
        <Route path='/home/profile' element={<Profile />} />
      </Route>
      {/*</Route>*/}
      {/* </Route>*/}
    </Routes>
  );
}

export default App;
