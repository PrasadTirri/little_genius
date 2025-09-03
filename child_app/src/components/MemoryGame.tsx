import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Brain, Star, Timer } from 'lucide-react';
import './MemoryGame.css';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [timeLeft, setTimeLeft] = useState(120);
  const [bestScore, setBestScore] = useState(0);

  const emojis = ['🐱', '🐕', '🐘', '🦋', '🌞', '🌙', '🌳', '🏠', '🚗', '📚', '🎈', '🎨', '⭐', '❤️', '🌈', '🍕'];

  const getDifficultySettings = () => {
    switch (difficulty) {
      case 'easy':
        return { pairs: 6, time: 120, gridCols: 4 };
      case 'medium':
        return { pairs: 8, time: 90, gridCols: 4 };
      case 'hard':
        return { pairs: 10, time: 60, gridCols: 5 };
      default:
        return { pairs: 6, time: 120, gridCols: 4 };
    }
  };

  const initializeGame = () => {
    const { pairs } = getDifficultySettings();
    const selectedEmojis = emojis.slice(0, pairs);
    const gameCards: Card[] = [];
    
    // Create pairs of cards
    selectedEmojis.forEach((emoji, index) => {
      gameCards.push(
        { id: index * 2, emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameOver(false);
    setTimeLeft(getDifficultySettings().time);
  };

  const startGame = () => {
    setGameStarted(true);
    initializeGame();
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards[firstId];
      const secondCard = newCards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setScore(score + 10);
        setFlippedCards([]);
        
        // Check if game is complete
        const allMatched = newCards.every(card => card.isMatched);
        if (allMatched) {
          setTimeout(() => {
            setGameOver(true);
            if (score + 10 > bestScore) {
              setBestScore(score + 10);
            }
          }, 500);
        }
      } else {
        // No match, flip cards back
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return '#4ecdc4';
      case 'medium': return '#feca57';
      case 'hard': return '#ff6b6b';
      default: return '#4ecdc4';
    }
  };

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gameOver]);

  if (!gameStarted) {
    return (
      <div className="game-container">
        <div className="game-header">
          <Link to="/" className="back-btn">
            <ArrowLeft size={24} />
            Back to Home
          </Link>
          <h1>🧠 Memory Challenge 🧠</h1>
        </div>
        
        <div className="difficulty-selector">
          <h2>Choose Your Challenge Level:</h2>
          <div className="difficulty-buttons">
            {(['easy', 'medium', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                className={`difficulty-btn ${difficulty === diff ? 'active' : ''}`}
                style={{ '--difficulty-color': getDifficultyColor(diff) } as React.CSSProperties}
                onClick={() => setDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="difficulty-info">
          <div className="info-card">
            <h3>Easy Mode</h3>
            <p>6 pairs • 2 minutes • 4x3 grid</p>
          </div>
          <div className="info-card">
            <h3>Medium Mode</h3>
            <p>8 pairs • 1.5 minutes • 4x4 grid</p>
          </div>
          <div className="info-card">
            <h3>Hard Mode</h3>
            <p>10 pairs • 1 minute • 5x4 grid</p>
          </div>
        </div>

        <div className="game-instructions">
          <h3>🎯 How to Play:</h3>
          <ul>
            <li>Find matching pairs of cards</li>
            <li>Click cards to flip them</li>
            <li>Remember where cards are located</li>
            <li>Complete the game before time runs out!</li>
          </ul>
        </div>

        <button className="btn start-btn" onClick={startGame}>
          🚀 Start Memory Challenge! 🚀
        </button>
      </div>
    );
  }

  if (gameOver) {
    const { pairs } = getDifficultySettings();
    const allMatched = cards.every(card => card.isMatched);
    
    return (
      <div className="game-container">
        <div className="game-header">
          <Link to="/" className="back-btn">
            <ArrowLeft size={24} />
            Back to Home
          </Link>
          <h1>🏁 Game Complete! 🏁</h1>
        </div>
        
        <div className="game-result">
          <div className="result-card">
            <h2>{allMatched ? '🎉 Amazing Memory! 🎉' : '⏰ Time\'s Up! ⏰'}</h2>
            <div className="final-score">
              <Brain className="brain-icon" />
              <span>Final Score: {score}</span>
            </div>
            <div className="score-breakdown">
              <p>Pairs Found: {Math.floor(score / 10)}/{pairs}</p>
              <p>Moves Made: {moves}</p>
              <p>Best Score: {Math.max(score, bestScore)}</p>
            </div>
            <div className="result-actions">
              <button className="btn" onClick={startGame}>
                <RefreshCw size={20} />
                Play Again
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

  const { gridCols } = getDifficultySettings();

  return (
    <div className="game-container">
      <div className="game-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={24} />
          Back to Home
        </Link>
        <h1>🧠 Memory Challenge 🧠</h1>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <Star className="stat-icon" />
          <span>Score: {score}</span>
        </div>
        <div className="stat-item">
          <span>Moves: {moves}</span>
        </div>
        <div className="stat-item">
          <Timer className="stat-icon" />
          <span>Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(score / (cards.length / 2 * 10)) * 100}%` }}
        ></div>
      </div>

      <div className="memory-grid" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">❓</div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="game-tips">
        <h3>💡 Memory Tips:</h3>
        <ul>
          <li>Start by flipping cards in a pattern</li>
          <li>Remember the positions of cards you've seen</li>
          <li>Focus on one area at a time</li>
          <li>Don't rush - take your time to remember!</li>
        </ul>
      </div>
    </div>
  );
};

export default MemoryGame;

