import { Routes, Route } from 'react-router-dom';
import MePage from './pages/MePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/me" element={<MePage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}