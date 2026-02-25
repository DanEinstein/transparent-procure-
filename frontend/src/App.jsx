import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import Registry from './pages/Registry';
import Fraud from './pages/Fraud';
import Audit from './pages/Audit';
import Reports from './pages/Reports';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="feed" element={<Feed />} />
        <Route path="registry" element={<Registry />} />
        <Route path="fraud" element={<Fraud />} />
        <Route path="audit" element={<Audit />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
