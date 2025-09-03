import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Calculator, Palette, TestTube, Home, GraduationCap } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/learning', label: 'Learning', icon: GraduationCap },
    { path: '/math', label: 'Math', icon: Calculator },
    { path: '/reading', label: 'Reading', icon: BookOpen },
    { path: '/science', label: 'Science', icon: TestTube },
    { path: '/art', label: 'Art', icon: Palette },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-text">🌟 Little Genius 🌟</span>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

