import { Link } from 'react-router-dom';
import { Calculator, BookOpen, Palette, Brain, TestTube, Trophy, Star, Heart } from 'lucide-react';
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
      title: 'Reading Fun',
      description: 'Discover stories, learn new words, and improve reading!',
      icon: BookOpen,
      path: '/reading',
      color: '#4ecdc4',
      emoji: '📚'
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
      title: 'Creative Art',
      description: 'Draw, color, and create amazing artwork!',
      icon: Palette,
      path: '/art',
      color: '#96ceb4',
      emoji: '🎨'
    },
    {
      title: 'Memory Challenge',
      description: 'Train your brain with fun memory games!',
      icon: Brain,
      path: '/memory',
      color: '#feca57',
      emoji: '🧠'
    }
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="rainbow">Welcome to Your Learning Adventure!</span>
        </h1>
        <p className="hero-subtitle">
          🌟 Learn, Play, and Grow Together! 🌟
        </p>
        <div className="hero-stats">
          <div className="stat">
            <Star className="stat-icon" />
            <span>Fun Learning</span>
          </div>
          <div className="stat">
            <Heart className="stat-icon" />
            <span>Safe & Friendly</span>
          </div>
          <div className="stat">
            <Trophy className="stat-icon" />
            <span>Earn Rewards</span>
          </div>
        </div>
      </div>

      <div className="activities-grid">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <Link key={index} to={activity.path} className="activity-card">
              <div className="activity-icon" style={{ backgroundColor: activity.color }}>
                <Icon size={40} color="white" />
              </div>
              <div className="activity-emoji">{activity.emoji}</div>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-arrow">→</div>
            </Link>
          );
        })}
      </div>

      <div className="welcome-message">
        <div className="message-card">
          <h2>🎉 Ready to Start Learning? 🎉</h2>
          <p>
            Choose any activity above to begin your amazing learning journey! 
            Each game is designed to be fun and educational, helping you learn 
            new things while having a great time.
          </p>
          <div className="tips">
            <h3>💡 Learning Tips:</h3>
            <ul>
              <li>Take your time and don't rush</li>
              <li>Ask for help if you need it</li>
              <li>Celebrate your achievements</li>
              <li>Have fun while learning!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

