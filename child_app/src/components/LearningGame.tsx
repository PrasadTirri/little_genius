import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2 } from 'lucide-react';
import './LearningGame.css';

interface LearningItem {
  id: string;
  display: string;
  pronunciation: string;
  category: 'alphabet' | 'number' | 'telugu';
}

const LearningGame = () => {
  const [currentCategory, setCurrentCategory] = useState<'alphabet' | 'number' | 'telugu'>('alphabet');

  // English Alphabets A-Z
  const alphabets: LearningItem[] = Array.from({ length: 26 }, (_, i) => ({
    id: `alpha-${i}`,
    display: String.fromCharCode(65 + i),
    pronunciation: String.fromCharCode(65 + i),
    category: 'alphabet' as const
  }));

  // Numbers 1-100
  const numbers: LearningItem[] = Array.from({ length: 100 }, (_, i) => ({
    id: `num-${i}`,
    display: (i + 1).toString(),
    pronunciation: (i + 1).toString(),
    category: 'number' as const
  }));

  // Telugu Letters (అ to ఱ)
  const teluguLetters: LearningItem[] = [
    { id: 'tel-1', display: 'అ', pronunciation: 'a', category: 'telugu' },
    { id: 'tel-2', display: 'ఆ', pronunciation: 'aa', category: 'telugu' },
    { id: 'tel-3', display: 'ఇ', pronunciation: 'i', category: 'telugu' },
    { id: 'tel-4', display: 'ఈ', pronunciation: 'ii', category: 'telugu' },
    { id: 'tel-5', display: 'ఉ', pronunciation: 'u', category: 'telugu' },
    { id: 'tel-6', display: 'ఊ', pronunciation: 'uu', category: 'telugu' },
    { id: 'tel-7', display: 'ఋ', pronunciation: 'ru', category: 'telugu' },
    { id: 'tel-8', display: 'ౠ', pronunciation: 'ruu', category: 'telugu' },
    { id: 'tel-9', display: 'ఎ', pronunciation: 'e', category: 'telugu' },
    { id: 'tel-10', display: 'ఏ', pronunciation: 'ee', category: 'telugu' },
    { id: 'tel-11', display: 'ఐ', pronunciation: 'ai', category: 'telugu' },
    { id: 'tel-12', display: 'ఒ', pronunciation: 'o', category: 'telugu' },
    { id: 'tel-13', display: 'ఓ', pronunciation: 'oo', category: 'telugu' },
    { id: 'tel-14', display: 'ఔ', pronunciation: 'au', category: 'telugu' },
    { id: 'tel-15', display: 'అం', pronunciation: 'am', category: 'telugu' },
    { id: 'tel-16', display: 'అః', pronunciation: 'ah', category: 'telugu' },
    { id: 'tel-17', display: 'క', pronunciation: 'ka', category: 'telugu' },
    { id: 'tel-18', display: 'ఖ', pronunciation: 'kha', category: 'telugu' },
    { id: 'tel-19', display: 'గ', pronunciation: 'ga', category: 'telugu' },
    { id: 'tel-20', display: 'ఘ', pronunciation: 'gha', category: 'telugu' },
    { id: 'tel-21', display: 'ఙ', pronunciation: 'nga', category: 'telugu' },
    { id: 'tel-22', display: 'చ', pronunciation: 'cha', category: 'telugu' },
    { id: 'tel-23', display: 'ఛ', pronunciation: 'chha', category: 'telugu' },
    { id: 'tel-24', display: 'జ', pronunciation: 'ja', category: 'telugu' },
    { id: 'tel-25', display: 'ఝ', pronunciation: 'jha', category: 'telugu' },
    { id: 'tel-26', display: 'ఞ', pronunciation: 'nya', category: 'telugu' },
    { id: 'tel-27', display: 'ట', pronunciation: 'ta', category: 'telugu' },
    { id: 'tel-28', display: 'ఠ', pronunciation: 'tha', category: 'telugu' },
    { id: 'tel-29', display: 'డ', pronunciation: 'da', category: 'telugu' },
    { id: 'tel-30', display: 'ఢ', pronunciation: 'dha', category: 'telugu' },
    { id: 'tel-31', display: 'ణ', pronunciation: 'na', category: 'telugu' },
    { id: 'tel-32', display: 'త', pronunciation: 'ta', category: 'telugu' },
    { id: 'tel-33', display: 'థ', pronunciation: 'tha', category: 'telugu' },
    { id: 'tel-34', display: 'ద', pronunciation: 'da', category: 'telugu' },
    { id: 'tel-35', display: 'ధ', pronunciation: 'dha', category: 'telugu' },
    { id: 'tel-36', display: 'న', pronunciation: 'na', category: 'telugu' },
    { id: 'tel-37', display: 'ప', pronunciation: 'pa', category: 'telugu' },
    { id: 'tel-38', display: 'ఫ', pronunciation: 'pha', category: 'telugu' },
    { id: 'tel-39', display: 'బ', pronunciation: 'ba', category: 'telugu' },
    { id: 'tel-40', display: 'భ', pronunciation: 'bha', category: 'telugu' },
    { id: 'tel-41', display: 'మ', pronunciation: 'ma', category: 'telugu' },
    { id: 'tel-42', display: 'య', pronunciation: 'ya', category: 'telugu' },
    { id: 'tel-43', display: 'ర', pronunciation: 'ra', category: 'telugu' },
    { id: 'tel-44', display: 'ల', pronunciation: 'la', category: 'telugu' },
    { id: 'tel-45', display: 'వ', pronunciation: 'va', category: 'telugu' },
    { id: 'tel-46', display: 'శ', pronunciation: 'sha', category: 'telugu' },
    { id: 'tel-47', display: 'ష', pronunciation: 'sha', category: 'telugu' },
    { id: 'tel-48', display: 'స', pronunciation: 'sa', category: 'telugu' },
    { id: 'tel-49', display: 'హ', pronunciation: 'ha', category: 'telugu' },
    { id: 'tel-50', display: 'ళ', pronunciation: 'la', category: 'telugu' },
    { id: 'tel-51', display: 'ఱ', pronunciation: 'ra', category: 'telugu' }
  ];

  const speakItem = (item: LearningItem) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(item.pronunciation);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryInfo = () => {
    switch (currentCategory) {
      case 'alphabet':
        return { title: 'English Alphabets', total: 26, color: '#ff6b6b' };
      case 'number':
        return { title: 'Numbers 1-100', total: 100, color: '#4ecdc4' };
      case 'telugu':
        return { title: 'Telugu Letters', total: 51, color: '#45b7d1' };
      default:
        return { title: 'Learning', total: 0, color: '#96ceb4' };
    }
  };

  const categoryInfo = getCategoryInfo();

  const renderAlphabetsGrid = () => (
    <div className="items-grid alphabet-grid">
      {alphabets.map((letter) => (
        <div key={letter.id} className="item-card alphabet-card">
          <span className="item-display-text">{letter.display}</span>
          <button 
            className="speak-item-btn"
            onClick={() => speakItem(letter)}
            title={`Speak ${letter.display}`}
          >
            <Volume2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderNumbersGrid = () => (
    <div className="items-grid numbers-grid">
      {numbers.map((number) => (
        <div key={number.id} className="item-card number-card">
          <span className="item-display-text">{number.display}</span>
          <button 
            className="speak-item-btn"
            onClick={() => speakItem(number)}
            title={`Speak ${number.display}`}
          >
            <Volume2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderTeluguGrid = () => (
    <div className="items-grid telugu-grid">
      {teluguLetters.map((letter) => (
        <div key={letter.id} className="item-card telugu-card">
          <span className="item-display-text">{letter.display}</span>
          <div className="telugu-pronunciation">
            <span className="pronunciation-text">{letter.pronunciation}</span>
          </div>
          <button 
            className="speak-item-btn"
            onClick={() => speakItem(letter)}
            title={`Speak ${letter.pronunciation}`}
          >
            <Volume2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="learning-container">
      <div className="learning-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={24} />
          Back to Home
        </Link>
        <h1>📚 Learning Center 📚</h1>
      </div>

      <div className="category-selector">
        <button
          className={`category-btn ${currentCategory === 'alphabet' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('alphabet')}
        >
          🔤 Alphabets (A-Z)
        </button>
        <button
          className={`category-btn ${currentCategory === 'number' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('number')}
        >
          🔢 Numbers (1-100)
        </button>
        <button
          className={`category-btn ${currentCategory === 'telugu' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('telugu')}
        >
          టెలుగు Telugu Letters
        </button>
      </div>

      <div className="learning-display">
        <div className="display-header" style={{ borderColor: categoryInfo.color }}>
          <h2 className="category-title">{categoryInfo.title}</h2>
          <p className="category-subtitle">
            {currentCategory === 'alphabet' && 'Learn all 26 English letters from A to Z'}
            {currentCategory === 'number' && 'Master counting from 1 to 100'}
            {currentCategory === 'telugu' && 'Explore 51 traditional Telugu characters'}
          </p>
        </div>

        {currentCategory === 'alphabet' && renderAlphabetsGrid()}
        {currentCategory === 'number' && renderNumbersGrid()}
        {currentCategory === 'telugu' && renderTeluguGrid()}
      </div>

      <div className="learning-tips">
        <h3>💡 Learning Tips:</h3>
        <ul>
          <li>Click the speaker icon to hear pronunciation</li>
          <li>Practice reading the letters and numbers aloud</li>
          <li>For Telugu letters, the pronunciation is shown below each character</li>
          <li>Switch between categories to learn different things!</li>
        </ul>
      </div>
    </div>
  );
};

export default LearningGame;
