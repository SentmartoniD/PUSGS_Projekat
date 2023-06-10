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
import AricleList from './components/ArticleList/ArticleList';
import MyCart from './components/MyCart/MyCart';
import AllOrders from './components/AllOrders/AllOrders';
import CurrentPastOrders from './components/CurrentPastOrders/CurrentPastOrders';
import OrderDetails from './components/OrderDetails.js/OrderDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<ProtectedRoute allowedRoles={["admin", "buyer", "seller"]} />} >
        <Route path='/home' element={<Dashboard />}>
          <Route element={< ProtectedRoute allowedRoles={["admin", "buyer", "seller"]} type="profile" />} >
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["seller"]} type="articles" />} >
            <Route path='articles' element={<Articles />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["buyer"]} />} >
            <Route path='article-list' element={<AricleList />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["buyer"]} />} >
            <Route path='current-past-orders' element={<CurrentPastOrders />} ></Route>
            <Route path='current-past-orders/order-details/:id' element={<OrderDetails />} ></Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />} >
            <Route path='aprove-verify-users' element={<ApproveVerifyUsers />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["buyer"]} />} >
            <Route path='my-cart' element={<MyCart />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["seller"]} type="new" />} >
            <Route path='new-orders' element={<AllOrders userType="seller-new" />} />
            <Route path='new-orders/order-details/:id' element={<OrderDetails />} ></Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["seller"]} type="my" />} >
            <Route path='my-orders' element={<AllOrders userType="seller-my" />} />
            <Route path='my-orders/order-details/:id' element={<OrderDetails />} ></Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />} >
            <Route path='all-orders' element={<AllOrders userType="admin" />} />
            <Route path='all-orders/order-details/:id' element={<OrderDetails />} ></Route>
          </Route>
        </Route>
      </Route>
    </Routes >
  );
}

export default App;
