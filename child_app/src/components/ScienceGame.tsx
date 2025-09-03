import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, TestTube, Star, Lightbulb } from 'lucide-react';
import './ScienceGame.css';

interface ScienceQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: 'animals' | 'plants' | 'space' | 'weather' | 'human-body';
}

const ScienceGame = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<ScienceQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const scienceQuestions: ScienceQuestion[] = [
    // Animals
    {
      question: "Which animal can change its color to blend in with its surroundings?",
      options: ["Lion", "Chameleon", "Elephant", "Giraffe"],
      correctAnswer: "Chameleon",
      explanation: "Chameleons are amazing reptiles that can change their skin color to match their environment!",
      category: "animals"
    },
    {
      question: "What do bees make that we eat?",
      options: ["Milk", "Honey", "Cheese", "Bread"],
      correctAnswer: "Honey",
      explanation: "Bees collect nectar from flowers and turn it into delicious honey!",
      category: "animals"
    },
    {
      question: "How many legs does a spider have?",
      options: ["6", "8", "10", "12"],
      correctAnswer: "8",
      explanation: "Spiders have 8 legs, which makes them different from insects that have 6 legs!",
      category: "animals"
    },
    
    // Plants
    {
      question: "What do plants need to grow?",
      options: ["Water, sunlight, and air", "Only water", "Only sunlight", "Only air"],
      correctAnswer: "Water, sunlight, and air",
      explanation: "Plants need water, sunlight, and air (carbon dioxide) to make their own food through photosynthesis!",
      category: "plants"
    },
    {
      question: "What part of the plant takes in water from the soil?",
      options: ["Leaves", "Flowers", "Roots", "Stem"],
      correctAnswer: "Roots",
      explanation: "Roots are like straws that suck up water and nutrients from the soil!",
      category: "plants"
    },
    
    // Space
    {
      question: "What planet is closest to the Sun?",
      options: ["Earth", "Mars", "Mercury", "Venus"],
      correctAnswer: "Mercury",
      explanation: "Mercury is the first planet from the Sun and the smallest planet in our solar system!",
      category: "space"
    },
    {
      question: "What do we call the bright lights we see in the night sky?",
      options: ["Stars", "Planets", "Moons", "Comets"],
      correctAnswer: "Stars",
      explanation: "Stars are giant balls of hot gas that give off light, just like our Sun!",
      category: "space"
    },
    
    // Weather
    {
      question: "What do we call frozen water that falls from the sky?",
      options: ["Rain", "Snow", "Hail", "Fog"],
      correctAnswer: "Snow",
      explanation: "Snow is made of tiny ice crystals that form when water vapor freezes in the clouds!",
      category: "weather"
    },
    {
      question: "What color is the sky on a sunny day?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correctAnswer: "Blue",
      explanation: "The sky looks blue because of how sunlight scatters in our atmosphere!",
      category: "weather"
    },
    
    // Human Body
    {
      question: "How many bones do humans have?",
      options: ["100", "206", "300", "500"],
      correctAnswer: "206",
      explanation: "Adults have 206 bones that make up our skeleton and help us move!",
      category: "human-body"
    },
    {
      question: "What organ pumps blood through our body?",
      options: ["Brain", "Heart", "Lungs", "Liver"],
      correctAnswer: "Heart",
      explanation: "The heart is a muscle that pumps blood to deliver oxygen and nutrients throughout our body!",
      category: "human-body"
    }
  ];

  const getRandomQuestion = (): ScienceQuestion => {
    return scienceQuestions[Math.floor(Math.random() * scienceQuestions.length)];
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setQuestionCount(0);
    setGameOver(false);
    setCurrentQuestion(getRandomQuestion());
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (selected: string) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(selected);
    const correct = selected === currentQuestion!.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);

    setTimeout(() => {
      if (questionCount < 9) {
        nextQuestion();
      } else {
        setGameOver(true);
      }
    }, 4000);
  };

  const nextQuestion = () => {
    setQuestionCount(questionCount + 1);
    setCurrentQuestion(getRandomQuestion());
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'animals': return '🐾';
      case 'plants': return '🌱';
      case 'space': return '🚀';
      case 'weather': return '🌤️';
      case 'human-body': return '👤';
      default: return '🔬';
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
          <h1>🔬 Science Explorer 🔬</h1>
        </div>
        
        <div className="game-intro">
          <h2>🌟 Discover Amazing Science Facts! 🌟</h2>
          <p>Learn about animals, plants, space, weather, and your amazing body!</p>
        </div>

        <div className="science-categories">
          <div className="category-card">
            <span className="category-emoji">🐾</span>
            <h3>Animals</h3>
            <p>Learn about amazing creatures</p>
          </div>
          <div className="category-card">
            <span className="category-emoji">🌱</span>
            <h3>Plants</h3>
            <p>Discover how plants grow</p>
          </div>
          <div className="category-card">
            <span className="category-emoji">🚀</span>
            <h3>Space</h3>
            <p>Explore the universe</p>
          </div>
          <div className="category-card">
            <span className="category-emoji">🌤️</span>
            <h3>Weather</h3>
            <p>Understand nature's patterns</p>
          </div>
          <div className="category-card">
            <span className="category-emoji">👤</span>
            <h3>Human Body</h3>
            <p>Learn about yourself</p>
          </div>
        </div>

        <div className="game-instructions">
          <h3>🎯 How to Play:</h3>
          <ul>
            <li>Answer 10 science questions</li>
            <li>Read the explanations to learn more</li>
            <li>Earn points for correct answers</li>
            <li>Discover amazing facts about the world!</li>
          </ul>
        </div>

        <button className="btn start-btn" onClick={startGame}>
          🚀 Start Science Adventure! 🚀
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
          <h1>🏁 Science Complete! 🏁</h1>
        </div>
        
        <div className="game-result">
          <div className="result-card">
            <h2>🎉 Amazing Scientist! 🎉</h2>
            <div className="final-score">
              <TestTube className="flask-icon" />
              <span>Final Score: {score}</span>
            </div>
            <div className="score-breakdown">
              <p>Questions Answered: {questionCount + 1}/10</p>
              <p>Knowledge Level: {score >= 80 ? 'Expert' : score >= 60 ? 'Advanced' : score >= 40 ? 'Intermediate' : 'Beginner'}</p>
            </div>
            <div className="result-actions">
              <button className="btn" onClick={startGame}>
                <RefreshCw size={20} />
                Explore More
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
        <h1>🔬 Science Explorer 🔬</h1>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <Star className="stat-icon" />
          <span>Score: {score}</span>
        </div>
        <div className="stat-item">
          <span>Question: {questionCount + 1}/10</span>
        </div>
        <div className="stat-item">
          <span>{getCategoryEmoji(currentQuestion?.category || '')} {currentQuestion?.category.replace('-', ' ').toUpperCase()}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((questionCount + 1) / 10) * 100}%` }}
        ></div>
      </div>

      {currentQuestion && (
        <div className="question-container">
          <div className="question-header">
            <h2 className="question-text">{currentQuestion.question}</h2>
            <div className="category-badge">
              {getCategoryEmoji(currentQuestion.category)} {currentQuestion.category.replace('-', ' ')}
            </div>
          </div>
          
          <div className="answer-options">
            {currentQuestion.options.map((option, index) => (
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

          {showExplanation && (
            <div className="explanation">
              <div className="explanation-header">
                <Lightbulb className="lightbulb-icon" />
                <h3>💡 Learn More!</h3>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && !showExplanation && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {isCorrect ? '🎉 Correct! You\'re a smart scientist! 🎉' : '❌ Good try! Keep learning! ❌'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScienceGame;

