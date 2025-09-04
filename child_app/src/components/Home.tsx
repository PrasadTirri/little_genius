import { Link } from 'react-router-dom';
import { Calculator, BookOpen, Palette, TestTube, GraduationCap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const activities = [
    {
      title: 'Math Adventure',
      description: 'Learn numbers, addition, subtraction, and more!',
      icon: Calculator,
      path: '/math',
      color: '#ff6b6b',
      emoji: '🔢'
    },
    {
      title: 'Reading Journey',
      description: 'Explore words, spelling, and vocabulary!',
      icon: BookOpen,
      path: '/reading',
      color: '#4ecdc4',
      emoji: '📚'
    },
    {
      title: 'Words',
      description: 'Learn English and Telugu alphabets by exploring complete words!',
      icon: GraduationCap,
      path: '/missing-letters',
      color: '#9b59b6',
      emoji: '🔤'
    },
    {
      title: 'Science Explorer',
      description: 'Learn about animals, plants, and amazing science facts!',
      icon: TestTube,
      path: '/science',
      color: '#45b7d1',
      emoji: '🔬'
    },
    {
      title: 'Art Studio',
      description: 'Create beautiful drawings and express your creativity!',
      icon: Palette,
      path: '/art',
      color: '#96ceb4',
      emoji: '🎨'
    },
    {
      title: 'Learning Center',
      description: 'Master alphabets, numbers, and Telugu letters!',
      icon: GraduationCap,
      path: '/learning',
      color: '#feca57',
      emoji: '📚'
    }
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to Your Learning Adventure! 🚀
        </h1>
        {/* <p className="hero-subtitle">
          Discover fun games and activities that make learning exciting!
        </p>
        <div className="hero-features">
          <div className="feature">
            <Trophy className="feature-icon" />
            <span>Earn Points</span>
          </div>
          <div className="feature">
            <Star className="feature-icon" />
            <span>Learn & Grow</span>
          </div>
          <div className="feature">
            <Heart className="feature-icon" />
            <span>Have Fun</span>
          </div>
        </div> */}
      </div>

      <div className="activities-section">
        <h2 className="section-title">Choose Your Adventure!</h2>
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <Link
              key={index}
              to={activity.path}
              className="activity-card"
              style={{ '--card-color': activity.color } as React.CSSProperties}
            >
              <div className="activity-icon">
                <activity.icon size={48} />
              </div>
              <div className="activity-emoji">{activity.emoji}</div>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="welcome-message">
        <h2>🌟 Ready to Start Learning? 🌟</h2>
        <p>
          Pick any activity above and begin your educational journey! 
          Each game is designed to be fun and help you learn new things.
        </p>
      </div>
    </div>
  );
};

export default Home;

