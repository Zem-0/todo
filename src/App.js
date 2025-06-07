import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">TaskMaster</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="nav-cta">Sign In</button>
        </div>
      </nav>

      <div className="landing-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Organize Your Tasks,<br />Boost Your Productivity</h1>
            <p className="hero-subtitle">
              The smart way to manage your daily tasks and achieve your goals.
              Simple, intuitive, and powerful.
            </p>
            <div className="hero-cta">
              <button className="primary-button" onClick={() => setShowDashboard(true)}>Get Started Free</button>
              <button className="secondary-button">Watch Demo</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">📝</div>
            <div className="floating-card card-2">✅</div>
            <div className="floating-card card-3">📅</div>
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="section-title">Why Choose TaskMaster?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h2>✨ Stay Organized</h2>
              <p>Keep track of all your tasks in one place with our intuitive interface</p>
            </div>
            <div className="feature-card">
              <h2>📅 Plan Ahead</h2>
              <p>Schedule and prioritize your daily activities with smart reminders</p>
            </div>
            <div className="feature-card">
              <h2>✅ Boost Productivity</h2>
              <p>Complete tasks efficiently with our powerful task management tools</p>
            </div>
          </div>
        </section>

        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-brand">TaskMaster</div>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#privacy">Privacy</a>
            </div>
          </div>
          <p className="copyright">© 2024 TaskMaster. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
