import { Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Register/Register'
import './components/Login/Login'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Articles from './components/Articles/Articles';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ApproveVerifyUsers from './components/ApproveVerifyUsers/ApproveVerifyUsers';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<ProtectedRoute allowedRoles={["admin", "buyer", "seller"]} />} >
        <Route path='/home' element={<Dashboard />}>
          <Route element={< ProtectedRoute allowedRoles={["admin", "buyer", "seller"]} />} >
            <Route path='/home/profile' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["seller"]} />} >
            <Route path='/home/articles' element={<Articles />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />} >
            <Route path='/home/aprove-verify-users' element={<ApproveVerifyUsers />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
