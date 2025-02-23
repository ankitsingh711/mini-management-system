import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import PrivateRoute from './components/ProtectedRoute';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Customers from './pages/customer';
import Notifications from './pages//notification';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/notifications" element={<Notifications />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;