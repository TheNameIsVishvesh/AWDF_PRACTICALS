import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div style={{
      backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
      minHeight: '100vh',
      color: isDarkMode ? '#f8fafc' : '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        <NavBar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/projects" element={<Projects isDarkMode={isDarkMode} />} />
            <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
            <Route path="*" element={<NotFound isDarkMode={isDarkMode} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
