import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, Star } from 'lucide-react';
import './MathGame.css';

interface MathProblem {
  question: string;
  answer: number;
  options: number[];
}

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [problemCount, setProblemCount] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const generateProblem = (): MathProblem => {
    let num1: number, num2: number, answer: number, question: string;
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
    }

    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
      if (wrongAnswer !== answer && wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }

    return {
      question,
      answer,
      options: options.sort(() => Math.random() - 0.5)
    };
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setProblemCount(0);
    setTimeLeft(30);
    setGameOver(false);
    setCurrentProblem(generateProblem());
  };

  const handleAnswerSelect = (selected: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(selected);
    const correct = selected === currentProblem!.answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (problemCount < 9) {
        setProblemCount(problemCount + 1);
        setCurrentProblem(generateProblem());
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setGameOver(true);
      }
    }, 1500);
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
          <h1>🔢 Math Adventure 🔢</h1>
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

        <div className="game-instructions">
          <h3>🎯 How to Play:</h3>
          <ul>
            <li>Solve math problems within the time limit</li>
            <li>Click on the correct answer</li>
            <li>Earn points for each correct answer</li>
            <li>Complete 10 problems to finish the game</li>
          </ul>
        </div>

        <button className="btn start-btn" onClick={startGame}>
          🚀 Start Math Adventure! 🚀
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
          <h1>🏁 Game Complete! 🏁</h1>
        </div>
        
        <div className="game-result">
          <div className="result-card">
            <h2>🎉 Congratulations! 🎉</h2>
            <div className="final-score">
              <Trophy className="trophy-icon" />
              <span>Final Score: {score}</span>
            </div>
            <div className="score-breakdown">
              <p>Problems Solved: {problemCount + 1}/10</p>
              <p>Accuracy: {Math.round((score / ((problemCount + 1) * 10)) * 100)}%</p>
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

  return (
    <div className="game-container">
      <div className="game-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={24} />
          Back to Home
        </Link>
        <h1>🔢 Math Adventure 🔢</h1>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <Star className="stat-icon" />
          <span>Score: {score}</span>
        </div>
        <div className="stat-item">
          <span>Problem: {problemCount + 1}/10</span>
        </div>
        <div className="stat-item">
          <span>Time: {timeLeft}s</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((problemCount + 1) / 10) * 100}%` }}
        ></div>
      </div>

      {currentProblem && (
        <div className="problem-container">
          <h2 className="problem-question">{currentProblem.question}</h2>
          
          <div className="answer-options">
            {currentProblem.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {isCorrect ? '🎉 Correct! Well done! 🎉' : '❌ Try again next time! ❌'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MathGame;

