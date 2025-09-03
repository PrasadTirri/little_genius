import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, BookOpen, Star, Volume2 } from 'lucide-react';
import './ReadingGame.css';

interface WordCard {
  word: string;
  image: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const ReadingGame = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordCard | null>(null);
  const [gameMode, setGameMode] = useState<'word-match' | 'spelling' | 'vocabulary'>('word-match');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const wordDatabase: WordCard[] = [
    // Easy words
    { word: 'cat', image: '🐱', category: 'animals', difficulty: 'easy' },
    { word: 'dog', image: '🐕', category: 'animals', difficulty: 'easy' },
    { word: 'sun', image: '☀️', category: 'nature', difficulty: 'easy' },
    { word: 'moon', image: '🌙', category: 'nature', difficulty: 'easy' },
    { word: 'tree', image: '🌳', category: 'nature', difficulty: 'easy' },
    { word: 'house', image: '🏠', category: 'places', difficulty: 'easy' },
    { word: 'car', image: '🚗', category: 'transport', difficulty: 'easy' },
    { word: 'book', image: '📚', category: 'objects', difficulty: 'easy' },
    
    // Medium words
    { word: 'elephant', image: '🐘', category: 'animals', difficulty: 'medium' },
    { word: 'butterfly', image: '🦋', category: 'animals', difficulty: 'medium' },
    { word: 'rainbow', image: '🌈', category: 'nature', difficulty: 'medium' },
    { word: 'mountain', image: '⛰️', category: 'nature', difficulty: 'medium' },
    { word: 'school', image: '🏫', category: 'places', difficulty: 'medium' },
    { word: 'airplane', image: '✈️', category: 'transport', difficulty: 'medium' },
    
    // Hard words
    { word: 'dinosaur', image: '🦕', category: 'animals', difficulty: 'hard' },
    { word: 'volcano', image: '🌋', category: 'nature', difficulty: 'hard' },
    { word: 'library', image: '📖', category: 'places', difficulty: 'hard' },
    { word: 'submarine', image: '🚢', category: 'transport', difficulty: 'hard' },
  ];

  const getRandomWord = (): WordCard => {
    const easyWords = wordDatabase.filter(w => w.difficulty === 'easy');
    const mediumWords = wordDatabase.filter(w => w.difficulty === 'medium');
    
    let selectedWords: WordCard[] = [];
    if (currentRound < 5) {
      selectedWords = easyWords;
    } else if (currentRound < 10) {
      selectedWords = [...easyWords, ...mediumWords];
    } else {
      selectedWords = wordDatabase;
    }
    
    return selectedWords[Math.floor(Math.random() * selectedWords.length)];
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentRound(0);
    setGameOver(false);
    setCurrentWord(getRandomWord());
    setFeedback('');
    setIsCorrect(null);
    setUserInput('');
  };

  const handleWordMatch = (selectedWord: string) => {
    const correct = selectedWord === currentWord!.word;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 10);
      setFeedback('🎉 Excellent! You got it right! 🎉');
    } else {
      setFeedback(`❌ Good try! The word was "${currentWord!.word}" ❌`);
    }

    setTimeout(() => {
      nextRound();
    }, 2000);
  };

  const handleSpelling = () => {
    const correct = userInput.toLowerCase().trim() === currentWord!.word.toLowerCase();
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 15);
      setFeedback('🎉 Perfect spelling! Well done! 🎉');
    } else {
      setFeedback(`❌ Almost! The correct spelling is "${currentWord!.word}" ❌`);
    }

    setTimeout(() => {
      nextRound();
    }, 2000);
  };

  const handleVocabulary = (selectedCategory: string) => {
    const correct = selectedCategory === currentWord!.category;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 12);
      setFeedback('🎉 Great categorization! You\'re smart! 🎉');
    } else {
      setFeedback(`❌ Nice try! "${currentWord!.word}" belongs to "${currentWord!.category}" ❌`);
    }

    setTimeout(() => {
      nextRound();
    }, 2000);
  };

  const nextRound = () => {
    if (currentRound < 14) {
      setCurrentRound(currentRound + 1);
      setCurrentWord(getRandomWord());
      setFeedback('');
      setIsCorrect(null);
      setUserInput('');
      setShowHint(false);
    } else {
      setGameOver(true);
    }
  };

  const speakWord = () => {
    if ('speechSynthesis' in window && currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const getGameInstructions = () => {
    switch (gameMode) {
      case 'word-match':
        return 'Match the word with the correct picture!';
      case 'spelling':
        return 'Type the word you see in the picture!';
      case 'vocabulary':
        return 'Choose the category that matches the word!';
      default:
        return '';
    }
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <div className="game-header">
          <Link to="/" className="back-btn">
            <ArrowLeft size={24} />
            Back to Home
          </Link>
          <h1>📚 Reading Adventure 📚</h1>
        </div>
        
        <div className="game-mode-selector">
          <h2>Choose Your Reading Challenge:</h2>
          <div className="mode-buttons">
            <button
              className={`mode-btn ${gameMode === 'word-match' ? 'active' : ''}`}
              onClick={() => setGameMode('word-match')}
            >
              🖼️ Word Match
            </button>
            <button
              className={`mode-btn ${gameMode === 'spelling' ? 'active' : ''}`}
              onClick={() => setGameMode('spelling')}
            >
              ✏️ Spelling
            </button>
            <button
              className={`mode-btn ${gameMode === 'vocabulary' ? 'active' : ''}`}
              onClick={() => setGameMode('vocabulary')}
            >
              🏷️ Vocabulary
            </button>
          </div>
        </div>

        <div className="game-instructions">
          <h3>📖 How to Play:</h3>
          <p>{getGameInstructions()}</p>
          <ul>
            <li>Complete 15 rounds to finish the game</li>
            <li>Earn points for correct answers</li>
            <li>Use hints if you need help</li>
            <li>Listen to words being spoken</li>
          </ul>
        </div>

        <button className="btn start-btn" onClick={startGame}>
          🚀 Start Reading Adventure! 🚀
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="game-container">
        <div className="game-header">
          <Link to="/" className="back-btn">
            <ArrowLeft size={24} />
            Back to Home
          </Link>
          <h1>🏁 Reading Complete! 🏁</h1>
        </div>
        
        <div className="game-result">
          <div className="result-card">
            <h2>🎉 Amazing Reading Skills! 🎉</h2>
            <div className="final-score">
              <BookOpen className="book-icon" />
              <span>Final Score: {score}</span>
            </div>
            <div className="score-breakdown">
              <p>Rounds Completed: {currentRound + 1}/15</p>
              <p>Average Score: {Math.round(score / (currentRound + 1))} per round</p>
            </div>
            <div className="result-actions">
              <button className="btn" onClick={startGame}>
                <RefreshCw size={20} />
                Read Again
              </button>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={24} />
          Back to Home
        </Link>
        <h1>📚 Reading Adventure 📚</h1>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <Star className="stat-icon" />
          <span>Score: {score}</span>
        </div>
        <div className="stat-item">
          <span>Round: {currentRound + 1}/15</span>
        </div>
        <div className="stat-item">
          <span>Mode: {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentRound + 1) / 15) * 100}%` }}
        ></div>
      </div>

      {currentWord && (
        <div className="word-container">
          <div className="word-display">
            <div className="word-image">{currentWord.image}</div>
            <div className="word-text">{currentWord.word}</div>
            <button className="speak-btn" onClick={speakWord}>
              <Volume2 size={24} />
              Listen
            </button>
          </div>

          {gameMode === 'word-match' && (
            <div className="game-content">
              <h3>Which picture matches this word?</h3>
              <div className="image-options">
                {[currentWord.image, '🐶', '🌲', '🏠'].sort(() => Math.random() - 0.5).map((image, index) => (
                  <button
                    key={index}
                    className={`image-option ${image === currentWord.image ? 'correct' : ''}`}
                    onClick={() => handleWordMatch(image === currentWord.image ? currentWord.word : 'wrong')}
                    disabled={isCorrect !== null}
                  >
                    <span className="option-image">{image}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameMode === 'spelling' && (
            <div className="game-content">
              <h3>Type the word you see:</h3>
              <div className="spelling-input">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type the word here..."
                  className="word-input"
                  disabled={isCorrect !== null}
                />
                <button 
                  className="btn check-btn" 
                  onClick={handleSpelling}
                  disabled={!userInput.trim() || isCorrect !== null}
                >
                  Check Spelling
                </button>
              </div>
              <button 
                className="hint-btn" 
                onClick={() => setShowHint(!showHint)}
                disabled={isCorrect !== null}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint && (
                <div className="hint">
                  <p>💡 Hint: This word starts with "{currentWord.word.charAt(0).toUpperCase()}" and has {currentWord.word.length} letters.</p>
                </div>
              )}
            </div>
          )}

          {gameMode === 'vocabulary' && (
            <div className="game-content">
              <h3>What category does this word belong to?</h3>
              <div className="category-options">
                {['animals', 'nature', 'places', 'transport', 'objects'].map((category) => (
                  <button
                    key={category}
                    className={`category-option ${category === currentWord.category ? 'correct' : ''}`}
                    onClick={() => handleVocabulary(category)}
                    disabled={isCorrect !== null}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {feedback && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingGame;

