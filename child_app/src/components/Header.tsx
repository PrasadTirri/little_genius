import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Calculator, Palette, Brain, TestTube, Home } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/math', label: 'Math', icon: Calculator },
    { path: '/reading', label: 'Reading', icon: BookOpen },
    { path: '/science', label: 'Science', icon: TestTube },
    { path: '/art', label: 'Art', icon: Palette },
    { path: '/memory', label: 'Memory', icon: Brain },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-emoji">🌟</span>
          <span className="logo-text">Kids Learning Adventure</span>
          <span className="logo-emoji">🌟</span>
        </Link>
        
        <nav className="nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;

