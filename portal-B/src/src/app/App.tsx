import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';

export default function App() {
  return (
    <BrowserRouter basename="/bora-portal/portal-B">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </BrowserRouter>
  );
}
