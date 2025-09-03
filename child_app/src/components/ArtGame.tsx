import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import './ArtGame.css';

const ArtGame = () => {
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser' | 'fill'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [currentColor, setCurrentColor] = useState('#ff6b6b');
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameMode, setGameMode] = useState<'free-draw' | 'coloring' | 'trace'>('free-draw');
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#10ac84', '#ee5a24', '#0abde3', '#ff3838', '#f368e0'
  ];

  const brushSizes = [3, 5, 8, 12, 16, 20];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = currentColor;
        context.lineWidth = brushSize;
        contextRef.current = context;
      }
    }
  }, [currentColor, brushSize]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) return;
    
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;
    
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const downloadArt = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const startGame = () => {
    setGameStarted(true);
    clearCanvas();
  };

  const getGameInstructions = () => {
    switch (gameMode) {
      case 'free-draw':
        return 'Draw whatever you want! Use your imagination to create amazing artwork.';
      case 'coloring':
        return 'Color in the shapes and patterns! Try different colors and make it beautiful.';
      case 'trace':
        return 'Follow the dotted lines to complete the picture! Practice your drawing skills.';
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
          <h1>🎨 Creative Art Studio 🎨</h1>
        </div>
        
        <div className="game-mode-selector">
          <h2>Choose Your Creative Adventure:</h2>
          <div className="mode-buttons">
            <button
              className={`mode-btn ${gameMode === 'free-draw' ? 'active' : ''}`}
              onClick={() => setGameMode('free-draw')}
            >
              ✏️ Free Draw
            </button>
            <button
              className={`mode-btn ${gameMode === 'coloring' ? 'active' : ''}`}
              onClick={() => setGameMode('coloring')}
            >
              🎨 Coloring
            </button>
            <button
              className={`mode-btn ${gameMode === 'trace' ? 'active' : ''}`}
              onClick={() => setGameMode('trace')}
            >
              📝 Tracing
            </button>
          </div>
        </div>

        <div className="game-instructions">
          <h3>🎯 How to Create:</h3>
          <p>{getGameInstructions()}</p>
          <ul>
            <li>Use different colors and brush sizes</li>
            <li>Try the eraser to fix mistakes</li>
            <li>Save your artwork when you're done</li>
            <li>Be creative and have fun!</li>
          </ul>
        </div>

        <button className="btn start-btn" onClick={startGame}>
          🚀 Start Creating! 🚀
        </button>
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
        <h1>🎨 Creative Art Studio 🎨</h1>
      </div>

      <div className="art-toolbar">
        <div className="tool-section">
          <h3>🖌️ Tools</h3>
          <div className="tool-buttons">
            <button
              className={`tool-btn ${currentTool === 'brush' ? 'active' : ''}`}
              onClick={() => setCurrentTool('brush')}
            >
              ✏️ Brush
            </button>
            <button
              className={`tool-btn ${currentTool === 'eraser' ? 'active' : ''}`}
              onClick={() => setCurrentTool('eraser')}
            >
              🧽 Eraser
            </button>
            <button
              className={`tool-btn ${currentTool === 'fill' ? 'active' : ''}`}
              onClick={() => setCurrentTool('fill')}
            >
              🎨 Fill
            </button>
          </div>
        </div>

        <div className="tool-section">
          <h3>🎨 Colors</h3>
          <div className="color-palette">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`color-btn ${currentColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="tool-section">
          <h3>📏 Size</h3>
          <div className="size-selector">
            {brushSizes.map((size, index) => (
              <button
                key={index}
                className={`size-btn ${brushSize === size ? 'active' : ''}`}
                onClick={() => setBrushSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="tool-section">
          <h3>⚡ Actions</h3>
          <div className="action-buttons">
            <button className="action-btn" onClick={clearCanvas}>
              <Trash2 size={20} />
              Clear
            </button>
            <button className="action-btn" onClick={downloadArt}>
              <Download size={20} />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="art-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      <div className="art-tips">
        <h3>💡 Art Tips:</h3>
        <ul>
          <li>Start with light strokes and build up your drawing</li>
          <li>Use different colors to add depth and interest</li>
          <li>Don't worry about mistakes - art is about expression!</li>
          <li>Try mixing colors to create new ones</li>
        </ul>
      </div>
    </div>
  );
};

export default ArtGame;

