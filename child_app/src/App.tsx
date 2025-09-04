import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MathGame from './components/MathGame';
import ReadingGame from './components/ReadingGame';
import ScienceGame from './components/ScienceGame';
import ArtGame from './components/ArtGame';
import LearningGame from './components/LearningGame';
import MissingLettersGame from './components/MissingLettersGame';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/math" element={<MathGame />} />
            <Route path="/reading" element={<ReadingGame />} />
            <Route path="/missing-letters" element={<MissingLettersGame />} />
            <Route path="/science" element={<ScienceGame />} />
            <Route path="/art" element={<ArtGame />} />
            <Route path="/learning" element={<LearningGame />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
