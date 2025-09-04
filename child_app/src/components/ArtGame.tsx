import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Trash2, Undo2, Redo2 } from 'lucide-react';
import './ArtGame.css';

const ArtGame = () => {
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser' | 'fill'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [currentColor, setCurrentColor] = useState('#96ceb4'); // Default green color
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef(-1);

  const colors = [
    '#96ceb4', '#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#10ac84', '#ee5a24', '#0abde3', '#ff3838', '#f368e0'
  ];

  const brushSizes = [3, 5, 8, 12, 16, 20];

  // Initialize canvas
  const initCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      // Set canvas size to match display size
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Set initial context properties with green color
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#96ceb4'; // Explicitly set green color
        context.lineWidth = brushSize;
        contextRef.current = context;
        
        // Clear canvas and save initial state
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Ensure the context is properly set up
        context.strokeStyle = '#96ceb4';
        context.lineWidth = brushSize;
        
        saveToHistory();
      }
    }
  }, [brushSize]); // Remove currentColor dependency to avoid re-initialization

  // Save current canvas state to history
  const saveToHistory = useCallback(() => {
    if (contextRef.current && canvasRef.current) {
      const imageData = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Remove any future history if we're not at the end
      if (historyIndexRef.current < historyRef.current.length - 1) {
        historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      }
      
      historyRef.current.push(imageData);
      historyIndexRef.current = historyRef.current.length - 1;
      
      // Limit history to 20 states
      if (historyRef.current.length > 20) {
        historyRef.current.shift();
        historyIndexRef.current--;
      }
      
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    }
  }, []);

  // Initialize canvas when component mounts
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initCanvas();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [initCanvas]);

  // Update context when tool, color, or size changes
  useEffect(() => {
    if (contextRef.current) {
      if (currentTool === 'eraser') {
        contextRef.current.strokeStyle = '#ffffff';
        contextRef.current.lineWidth = brushSize;
      } else {
        contextRef.current.strokeStyle = currentColor;
        contextRef.current.lineWidth = brushSize;
      }
    }
  }, [currentTool, currentColor, brushSize]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && contextRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        // Save current drawing
        const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
        
        // Resize canvas
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Restore drawing
        contextRef.current.putImageData(imageData, 0, 0);
        
        // Update context properties
        contextRef.current.lineCap = 'round';
        contextRef.current.lineJoin = 'round';
        if (currentTool === 'eraser') {
          contextRef.current.strokeStyle = '#ffffff';
        } else {
          contextRef.current.strokeStyle = currentColor;
        }
        contextRef.current.lineWidth = brushSize;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentTool, currentColor, brushSize]);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) {
      console.log('Context not ready, reinitializing...');
      initCanvas();
      return;
    }
    
    setIsDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    let x: number, y: number;
    
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    // Ensure context is properly set
    contextRef.current.lineCap = 'round';
    contextRef.current.lineJoin = 'round';
    if (currentTool === 'eraser') {
      contextRef.current.strokeStyle = '#ffffff';
    } else {
      contextRef.current.strokeStyle = currentColor;
    }
    contextRef.current.lineWidth = brushSize;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    
    console.log('Started drawing at:', x, y, 'with color:', contextRef.current.strokeStyle);
  }, [currentTool, currentColor, brushSize, initCanvas]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    
    const rect = canvasRef.current!.getBoundingClientRect();
    let x: number, y: number;
    
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    // Ensure context is properly set before drawing
    if (currentTool === 'eraser') {
      contextRef.current.strokeStyle = '#ffffff';
    } else {
      contextRef.current.strokeStyle = currentColor;
    }
    contextRef.current.lineWidth = brushSize;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    
    console.log('Drawing to:', x, y, 'with color:', contextRef.current.strokeStyle);
  }, [isDrawing, currentTool, currentColor, brushSize]);

  const stopDrawing = useCallback(() => {
    if (!contextRef.current) return;
    
    setIsDrawing(false);
    contextRef.current.closePath();
    
    // Save to history after drawing stops
    setTimeout(() => saveToHistory(), 100);
  }, [saveToHistory]);

  const clearCanvas = useCallback(() => {
    if (!contextRef.current || !canvasRef.current) return;
    
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveToHistory();
  }, [saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0 && contextRef.current && canvasRef.current) {
      historyIndexRef.current--;
      const imageData = historyRef.current[historyIndexRef.current];
      contextRef.current.putImageData(imageData, 0, 0);
      
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    }
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1 && contextRef.current && canvasRef.current) {
      historyIndexRef.current++;
      const imageData = historyRef.current[historyIndexRef.current];
      contextRef.current.putImageData(imageData, 0, 0);
      
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    }
  }, []);

  const downloadArt = useCallback(() => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    // Reset history
    historyRef.current = [];
    historyIndexRef.current = -1;
    setCanUndo(false);
    setCanRedo(false);
    
    // Ensure green color is selected and applied
    setCurrentColor('#96ceb4');
    
    // Initialize canvas with green color
    setTimeout(() => {
      if (contextRef.current) {
        contextRef.current.strokeStyle = '#96ceb4';
        contextRef.current.lineWidth = brushSize;
      }
    }, 100);
    
    initCanvas();
  }, [initCanvas, brushSize]);

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
        
        <div className="game-instructions">
          <h3>🎯 Welcome to Your Art Studio!</h3>
          <p>Create amazing artwork with our professional drawing tools!</p>
          <div className="default-color-info">
            <span>🎨 Default Color: </span>
            <div 
              className="default-color-preview" 
              style={{ backgroundColor: '#96ceb4' }}
              title="Green - Default Color"
            ></div>
            <span>Green</span>
          </div>
          <ul>
            <li>Use different colors and brush sizes</li>
            <li>Try the eraser to fix mistakes</li>
            <li>Use Undo/Redo to fix errors</li>
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
          <div className="current-tool-info">
            <span>Current: {currentTool === 'brush' ? 'Brush' : currentTool === 'eraser' ? 'Eraser' : 'Fill'}</span>
            {currentTool === 'brush' && <span>Color: {currentColor}</span>}
            <span>Size: {brushSize}px</span>
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
            <button className="action-btn" onClick={undo} disabled={!canUndo}>
              <Undo2 size={20} />
              Undo
            </button>
            <button className="action-btn" onClick={redo} disabled={!canRedo}>
              <Redo2 size={20} />
              Redo
            </button>
            <button className="action-btn" onClick={clearCanvas}>
              <Trash2 size={20} />
              Clear
            </button>
            <button className="action-btn" onClick={downloadArt}>
              <Download size={20} />
              Save
            </button>
            <button 
              className="action-btn debug-btn" 
              onClick={() => {
                if (contextRef.current) {
                  console.log('Canvas context:', contextRef.current);
                  console.log('Current color:', contextRef.current.strokeStyle);
                  console.log('Current size:', contextRef.current.lineWidth);
                  console.log('Canvas size:', canvasRef.current?.width, 'x', canvasRef.current?.height);
                } else {
                  console.log('No context available');
                }
              }}
            >
              🔍 Debug
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
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="art-tips">
        <h3>💡 Art Tips:</h3>
        <ul>
          <li>Start with light strokes and build up your drawing</li>
          <li>Use different colors to add depth and interest</li>
          <li>Don't worry about mistakes - use Undo/Redo!</li>
          <li>Try mixing colors to create new ones</li>
          <li>Use the eraser to clean up edges</li>
        </ul>
      </div>
    </div>
  );
};

export default ArtGame;

