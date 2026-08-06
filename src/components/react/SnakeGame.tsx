import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 15;
const INITIAL_SNAKE = [[7, 7], [7, 8], [7, 9]];
const INITIAL_DIRECTION = [0, -1];

const Cell = memo(({ isSnake, isFood }: { isSnake: boolean; isFood: boolean }) => {
  return (
    <div 
      className={`
        w-4 h-4 md:w-5 md:h-5 rounded-[3px] 
        ${isSnake ? 'bg-current shadow-current/20 z-10' : 
          isFood ? 'bg-green-500 animate-pulse scale-90 rounded-full' : 
          'bg-current/10'}
      `} 
    />
  );
});

const ArrowIcon = memo(({ dir }: { dir: 'up' | 'down' | 'left' | 'right' }) => {
  const rotations = { up: '0deg', down: '180deg', left: '-90deg', right: '90deg' };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rotations[dir]})` }}>
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  );
});

export default function SnakeGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState([3, 3]);
  const [dir, setDir] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const lastRenderedDir = useRef(dir);

  const handleStart = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setSnake(INITIAL_SNAKE);
    setDir(INITIAL_DIRECTION);
    lastRenderedDir.current = INITIAL_DIRECTION;
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setCountdown(null), 800);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const moveSnake = useCallback(() => {
    if (gameOver || countdown !== null) return;
    const newSnake = [...snake];
    const head = [newSnake[0][0] + dir[0], newSnake[0][1] + dir[1]];

    if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE || 
        newSnake.some(s => s[0] === head[0] && s[1] === head[1])) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);
    if (head[0] === food[0] && head[1] === food[1]) {
      setScore(s => s + 10);
      setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
    lastRenderedDir.current = dir;
  }, [snake, dir, food, gameOver, countdown]);

  const moveSnakeRef = useRef(moveSnake);
  useEffect(() => {
    moveSnakeRef.current = moveSnake;
  }, [moveSnake]);

  useEffect(() => {
    if (isPlaying && !gameOver && countdown === null) {
      const interval = setInterval(() => {
        moveSnakeRef.current();
      }, 130);
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameOver, countdown]); 

  const handleDirection = useCallback((newDir: number[]) => {
    setDir(prevDir => {
      if (newDir[0] === prevDir[0] && newDir[1] === prevDir[1]) return prevDir;
      if (newDir[0] === -prevDir[0] && newDir[1] === -prevDir[1]) return prevDir;
      if (newDir[0] === -lastRenderedDir.current[0] && newDir[1] === -lastRenderedDir.current[1]) return prevDir;
      return newDir;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isArrowKey = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key);

      if (isArrowKey && isPlaying && !gameOver && countdown === null) {
        e.preventDefault();
      }

      if (e.repeat) return;
      if (!isPlaying || gameOver || countdown !== null) return;
      
      if (key === 'arrowup' || key === 'w') handleDirection([0, -1]);
      if (key === 'arrowdown' || key === 's') handleDirection([0, 1]);
      if (key === 'arrowleft' || key === 'a') handleDirection([-1, 0]);
      if (key === 'arrowright' || key === 'd') handleDirection([1, 0]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, countdown, handleDirection]);

  return (
    <div className="w-full flex flex-col items-center text-current">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.button 
            key="start" 
            onClick={handleStart} 
            className="w-48 h-48 border-2 border-current/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:bg-current/5 text-current cursor-pointer"
          >
            <span className="text-5xl">🐍</span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">START</span>
          </motion.button>
        ) : (
          <motion.div key="game" className="w-full max-w-fit flex flex-col items-center gap-6">
            <div className="w-full flex justify-between items-center px-1">
              <div className="flex flex-col">
                <span className="text-[9px] font-black opacity-40 uppercase tracking-widest leading-none">Neural Score</span>
                <span className="text-3xl font-mono font-black">{score}</span>
              </div>
              {gameOver && <span className="text-[10px] font-black text-red-500 border border-red-500/20 px-3 py-1 rounded-full bg-red-500/5">CONNECTION LOST</span>}
            </div>

            <div className="relative">
              <AnimatePresence>
                {countdown !== null && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="absolute inset-0 z-50 flex items-center justify-center bg-[#080807]/80 backdrop-blur-[2px] rounded-2xl"
                  >
                    <span className="text-6xl font-black font-mono italic">{countdown === 0 ? "GO!" : countdown}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid gap-0.5 bg-current/5 p-1 rounded-2xl border-2 border-current/20 shadow-[0_0_30px_rgba(0,0,0,0.02)] overflow-hidden" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                  const x = i % GRID_SIZE, y = Math.floor(i / GRID_SIZE);
                  const isSnake = snake.some(s => s[0] === x && s[1] === y);
                  const isFood = food[0] === x && food[1] === y;
                  return <Cell key={i} isSnake={isSnake} isFood={isFood} />;
                })}
              </div>
            </div>

            <div className={`grid grid-cols-3 gap-3 md:hidden ${countdown !== null ? 'opacity-20 pointer-events-none' : ''}`}>
              <div />
              <button onPointerDown={() => handleDirection([0, -1])} className="w-16 h-16 flex items-center justify-center bg-current/5 border border-current/10 rounded-2xl active:bg-current active:text-bg-card text-current">
                <ArrowIcon dir="up" />
              </button>
              <div />
              <button onPointerDown={() => handleDirection([-1, 0])} className="w-16 h-16 flex items-center justify-center bg-current/5 border border-current/10 rounded-2xl active:bg-current active:text-bg-card text-current">
                <ArrowIcon dir="left" />
              </button>
              <button onPointerDown={() => handleDirection([0, 1])} className="w-16 h-16 flex items-center justify-center bg-current/5 border border-current/10 rounded-2xl active:bg-current active:text-bg-card text-current">
                <ArrowIcon dir="down" />
              </button>
              <button onPointerDown={() => handleDirection([1, 0])} className="w-16 h-16 flex items-center justify-center bg-current/5 border border-current/10 rounded-2xl active:bg-current active:text-bg-card text-current">
                <ArrowIcon dir="right" />
              </button>
            </div>

            <div className="w-full flex justify-between items-center px-1">
              {gameOver ? (
                <button onClick={handleStart} className="text-[10px] font-black bg-current/10 px-6 py-2 rounded-full uppercase cursor-pointer">Reboot</button>
              ) : (
                <span className="text-[9px] opacity-30 font-black uppercase tracking-[0.3em] md:block hidden">System Stable</span>
              )}
              <button onClick={() => setIsPlaying(false)} className="text-[10px] text-red-500/60 font-black border border-red-500/20 px-4 py-2 rounded-full uppercase cursor-pointer">Terminate</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}