import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  const studentData = {
    name: 'Vishvesh Joshi',
    title: 'Full Stack Web Developer & B.Tech Student',
    themeColor: '#1e3a8a',
    bio: 'Passionate software engineering student specializing in Advanced Web Development Frameworks, React component architecture, and modern full-stack web applications.',
    education: 'Charotar University of Science and Technology (CHARUSAT) - B.Tech IT/CE',
    skills: [
      'React.js',
      'JavaScript (ES6+)',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Git & GitHub'
    ],
    projects: [
      { title: 'Student Portfolio App', description: 'Modular Vite + React single page app with reusable functional components.' },
      { title: 'Task Management API', description: 'RESTful CRUD server built with Express and request logging middleware.' },
      { title: 'Full Stack MERN Portal', description: 'Interactive React frontend wired to MongoDB database with JWT auth.' }
    ],
    email: 'joshivishvesh22@gmail.com',
    github: 'TheNameIsVishvesh'
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f1f5f9',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <Header
        name={studentData.name}
        title={studentData.title}
        themeColor={studentData.themeColor}
      />
      <main>
        <About
          bio={studentData.bio}
          education={studentData.education}
        />
        <Skills
          skillList={studentData.skills}
          category="Frontend & Backend"
        />
        <Projects
          projectList={studentData.projects}
        />
      </main>
      <Footer
        copyrightYear={2026}
        contactEmail={studentData.email}
        githubUser={studentData.github}
      />
    </div>
  );
}

export default App;
