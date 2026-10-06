'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

// Core logic to handle Wordle's color assignment (including double letters)
const evaluateGuess = (guess, target) => {
    const result = Array(WORD_LENGTH).fill('absent');
    const targetCharCounts = {};

    for (let char of target) {
        targetCharCounts[char] = (targetCharCounts[char] || 0) + 1;
    }

    // First pass: Identify exact matches (Green)
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === target[i]) {
            result[i] = 'correct';
            targetCharCounts[guess[i]]--;
        }
    }

    // Second pass: Identify partial matches (Yellow)
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (result[i] === 'correct') continue;

        if (targetCharCounts[guess[i]] > 0) {
            result[i] = 'present';
            targetCharCounts[guess[i]]--;
        }
    }

    return result.map((status, i) => ({ letter: guess[i], status }));
};

export default function App() {
    const [guesses, setGuesses] = useState([]); // Array of evaluated guesses
    const [currentGuess, setCurrentGuess] = useState("");
    const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'lost'
    const [toast, setToast] = useState(null);
    const [isFading, setIsFading] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    // A robust dictionary of valid 5-letter words for checking guesses and selecting targets
    const [validGuesses, setValidGuesses] = useState(new Set());
    const [targetWord, setTargetWord] = useState('SAHAJ');
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    // Stats and Modal State
    const [showStats, setShowStats] = useState(false);
    const [isStatsFadingOut, setIsStatsFadingOut] = useState(false);
    const [stats, setStats] = useState({
        played: 0, wins: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0]
    });
    const [isRestored, setIsRestored] = useState(false); // <--- ADD THIS NEW STATE HERE

    // Calculate game number (Day 1 is Oct 6, 2026)
    const today = new Date();
    const startDate = new Date(2026, 9, 5);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffInMs = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
        Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const gameNumber = Math.floor(diffInMs / msPerDay) + 1;

    // Load stats from local storage on first load
    useEffect(() => {
        const savedStats = localStorage.getItem('sahajdleStats');
        if (savedStats) setStats(JSON.parse(savedStats));
    }, []);

    useEffect(() => {
        fetch('/valid-wordle-words.txt')
            .then(response => response.text())
            .then(text => {
                const words = text
                    .split('\n')
                    .map(w => w.trim().toUpperCase())
                    .filter(w => w.length === 5);

                const wordSet = new Set(words);
                wordSet.add('SAHAJ'); // Ensure target word is always valid
                setValidGuesses(wordSet);

                // --- NEW: Load saved game state ---
                const savedState = localStorage.getItem('sahajdleGameState');
                if (savedState) {
                    const parsed = JSON.parse(savedState);

                    // Only restore the board if the save is from TODAY
                    if (parsed.gameNumber === gameNumber) {
                        setGuesses(parsed.guesses);
                        setGameStatus(parsed.gameStatus);

                        // If they already finished today's puzzle, delay pop up stats
                        if (parsed.gameStatus !== 'playing') {
                            setTimeout(() => setShowStats(true), 1500);
                        }
                    } else {
                        // It's a new day! Delete yesterday's board.
                        localStorage.removeItem('sahajdleGameState');
                    }
                }

                setIsRestored(true); // Mark that we finished loading saves
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to load dictionary:", error);
                setIsLoading(false);
            });
    }, [gameNumber]);

    // Auto-save the board every time a guess is made or game status changes
    useEffect(() => {
        if (isRestored) {
            localStorage.setItem('sahajdleGameState', JSON.stringify({
                gameNumber,
                guesses,
                gameStatus
            }));
        }
    }, [guesses, gameStatus, gameNumber, isRestored]);

    const showToast = useCallback((message, duration = 2500) => {
        setToast(message);
        setIsFading(false); // Reset fade state when a new toast appears

        if (duration > 0) {
            setTimeout(() => {
                setIsFading(true); // 1. Start the fade out transition

                setTimeout(() => {
                    setToast(null); // 2. Remove it from the screen after it's invisible
                }, 300); // 300ms gives it time to fade out
            }, duration - 300);
        }
    }, []);

    const handleGameEnd = useCallback((isWin, numGuesses) => {
        setStats(prev => {
            const newDist = [...prev.distribution];
            if (isWin) newDist[numGuesses - 1] += 1;

            const newStreak = isWin ? prev.currentStreak + 1 : 0;
            const newStats = {
                played: prev.played + 1,
                wins: prev.wins + (isWin ? 1 : 0),
                currentStreak: newStreak,
                maxStreak: Math.max(prev.maxStreak, newStreak),
                distribution: newDist
            };
            localStorage.setItem('sahajdleStats', JSON.stringify(newStats));
            return newStats;
        });

        // Delay the modal slightly so the user can see the final tiles flip
        setTimeout(() => setShowStats(true), 1500);
    }, []);

    const onKeyPress = useCallback((key) => {
        if (gameStatus !== 'playing') return;

        if (key === 'BACKSPACE') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (key === 'ENTER') {
            if (currentGuess.length !== WORD_LENGTH) {
                showToast("Not enough letters");
                triggerShake();
                return;
            }

            if (!validGuesses.has(currentGuess)) {
                showToast("Not in word list");
                triggerShake();
                return;
            }

            // Valid guess submission
            const evaluated = evaluateGuess(currentGuess, targetWord);
            const newGuesses = [...guesses, evaluated];
            setGuesses(newGuesses);
            setCurrentGuess("");

            // Check win/loss
            if (currentGuess === targetWord) {
                setGameStatus('won');
                const messages = ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'];
                showToast(messages[guesses.length], 2000);
                handleGameEnd(true, newGuesses.length);
            } else if (newGuesses.length === MAX_GUESSES) {
                setGameStatus('lost');
                showToast(targetWord, 0);
                handleGameEnd(false, newGuesses.length);
            }
        } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
            setCurrentGuess(prev => prev + key);
        }
    }, [currentGuess, gameStatus, guesses, targetWord, showToast]);

    const triggerShake = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400); // Shake duration
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            const key = e.key.toUpperCase();
            if (key === 'BACKSPACE' || key === 'ENTER') {
                onKeyPress(key);
            } else if (/^[A-Z]$/.test(key) && key.length === 1) {
                onKeyPress(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onKeyPress]);

    const resetGame = () => {
        setGuesses([]);
        setCurrentGuess("");
        setGameStatus('playing');
        setToast(null);
    };

    if (showWelcome) {
        return (
            <div className="flex flex-col h-screen w-full items-center justify-center bg-[#121213] text-white font-sans text-center px-4">
                <style>{`
                    @keyframes welcomeFadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes welcomeFadeOutUp {
                        from { opacity: 1; transform: translateY(0); }
                        to { opacity: 0; transform: translateY(-40px); }
                    }
                    .animate-welcome-in {
                        animation: welcomeFadeIn 0.8s ease-out forwards;
                    }
                    .animate-play-btn-in {
                        animation: welcomeFadeIn 0.5s ease-out forwards;
                    }
                `}</style>

                <div id="welcome-content" className="max-w-md w-full animate-welcome-in opacity-0">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-widest uppercase mb-4">
                        Sahajdle
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-100 mb-2">
                        feels pretty self explanatory
                    </p>
                    {/*
                    <div className="flex justify-center gap-2 my-8">
                        {['S', 'A', 'H', 'A', 'J', 'D', 'L', 'E'].map((letter, i) => (
                            <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#538d4e] text-white font-bold text-xl sm:text-2xl rounded">
                                {letter}
                            </div>
                        ))}
                    </div>
                    */}

                    {/* Fixed height wrapper so layout doesn't jump when the button appears */}
                    <div className="h-[70px] mt-4 flex items-center justify-center mb-4">
                        {!isLoading && (
                            <button
                                onClick={() => {
                                    // Trigger the exit animation
                                    const content = document.getElementById('welcome-content');
                                    if (content) {
                                        content.style.animation = 'welcomeFadeOutUp 0.4s ease-in forwards';
                                    }
                                    // Wait for animation to finish before removing the welcome screen
                                    setTimeout(() => setShowWelcome(false), 400);
                                }}
                                className="px-10 py-4 rounded-full text-xl font-bold tracking-wide transition-all duration-300 w-1/2 sm:w-[50%] bg-[#538d4e] hover:bg-[#43723f] hover:scale-105 active:scale-95 text-white shadow-lg animate-play-btn-in opacity-0"
                            >
                                Play
                            </button>
                        )}
                    </div>
                    <p className="text-sm sm:text-lg text-gray-300 mb-2">
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-sm sm:text-lg text-gray-300 mb-2">
                        No. {gameNumber}
                    </p>
                </div>
            </div>
        );
    }

    // Track key status globally to colorize the keyboard
    const keyColors = {};
    guesses.forEach(guessRow => {
        guessRow.forEach(({ letter, status }) => {
            const currentStatus = keyColors[letter];
            if (currentStatus === 'correct') return; // Don't downgrade correct
            if (currentStatus === 'present' && status === 'absent') return; // Don't downgrade present to absent
            keyColors[letter] = status;
        });
    });

    return (
        <div className="flex flex-col h-screen bg-[#121213] text-white font-sans selection:bg-transparent">
            {/* Inline styles for custom animations */}
            <style>{`
        @keyframes pop {
          from { transform: scale(0.8); opacity: 0; }
          40% { transform: scale(1.1); }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop 0.1s; }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-2px, 0, 0); }
          20%, 80% { transform: translate3d(4px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
          40%, 60% { transform: translate3d(8px, 0, 0); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-out {
          animation: fadeOut 0.15s ease-in forwards;
        }

        @keyframes flip {
          0% { transform: rotateX(0); }
          50% { transform: rotateX(-90deg); }
          100% { transform: rotateX(0); }
        }
        .animate-flip {
          animation: flip 0.6s ease forwards;
        }

        /* Prevent scrollbouncing on iOS */
        body { overscroll-behavior-y: none; }
      `}</style>

            {/* Header */}
            <header className="flex items-center justify-between px-5 h-16 border-b border-[#3a3a3c] shrink-0">
                <div className="w-8 flex">
                    <Link href="/" className="px-3 py-2 cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out hover:text-[#538d4e]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </Link>
                </div>
                <h1 className="text-3xl font-extrabold tracking-widest uppercase">Sahajdle</h1>
                <div className="w-8 flex justify-end">
                    <button
                        className="px-3 py-2 cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out hover:text-[#538d4e]"
                        onClick={() => setShowStats(true)}
                        title="Statistics"
                        aria-label="Statistics"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10"></line>
                            <line x1="12" y1="20" x2="12" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="14"></line>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Toast Notification */}
            <div className="relative z-50 flex justify-center pointer-events-none">
                {toast && (
                    <div className={`absolute top-10 bg-white text-black font-bold px-4 py-3 rounded shadow-lg transition-opacity duration-300
                        ${isFading ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {toast}
                    </div>
                )}
            </div>

            {/* Game Board */}
            <main className="flex-grow flex items-center justify-center overflow-hidden pb-4 pt-4 px-2">
                <div className="grid grid-rows-6 gap-[5px] sm:gap-[6px] max-w-full aspect-[5/6] h-full max-h-[420px]">
                    {/* Render past guesses */}
                    {guesses.map((guessRow, i) => (
                        <div key={i} className="grid grid-cols-5 gap-[5px] sm:gap-[6px]">
                            {guessRow.map((obj, j) => (
                                <div
                                    key={j}
                                    className={`w-full h-full flex items-center justify-center text-3xl font-bold uppercase select-none transition-colors duration-500 ease-in
                    ${obj.status === 'correct' ? 'bg-[#538d4e] border-[#538d4e] text-white' :
                                            obj.status === 'present' ? 'bg-[#b59f3b] border-[#b59f3b] text-white' :
                                                'bg-[#3a3a3c] border-[#3a3a3c] text-white'}
                    animate-flip
                  `}
                                    style={{ animationDelay: `${j * 150}ms` }}
                                >
                                    {obj.letter}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Render current typing row */}
                    {gameStatus === 'playing' && guesses.length < MAX_GUESSES && (
                        <div className={`grid grid-cols-5 gap-[5px] sm:gap-[6px] ${isShaking ? 'animate-shake' : ''}`}>
                            {Array(WORD_LENGTH).fill('').map((_, j) => {
                                const letter = currentGuess[j] || '';
                                return (
                                    <div
                                        key={j}
                                        className={`w-full h-full border-2 flex items-center justify-center text-3xl font-bold uppercase select-none
                      ${letter ? 'border-[#565758] animate-pop' : 'border-[#3a3a3c]'}
                    `}
                                    >
                                        {letter}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Render remaining empty rows */}
                    {Array(Math.max(0, MAX_GUESSES - guesses.length - (gameStatus === 'playing' ? 1 : 0))).fill('').map((_, i) => (
                        <div key={`empty-${i}`} className="grid grid-cols-5 gap-[5px] sm:gap-[6px]">
                            {Array(WORD_LENGTH).fill('').map((_, j) => (
                                <div key={j} className="w-full h-full border-2 border-[#3a3a3c] flex items-center justify-center select-none" />
                            ))}
                        </div>
                    ))}
                </div>
            </main>

            {/* Keyboard */}
            <div className="w-full max-w-[500px] mx-auto pb-8 px-2 flex flex-col gap-2 shrink-0 touch-manipulation select-none">
                {KEYBOARD_ROWS.map((row, i) => (
                    <div key={i} className="flex justify-center gap-[4px] sm:gap-[6px] w-full">
                        {row.map(key => {
                            const status = keyColors[key];

                            let bgColor = 'bg-[#818384] hover:bg-[#6b6d6e]';
                            if (status === 'correct') bgColor = 'bg-[#538d4e]';
                            else if (status === 'present') bgColor = 'bg-[#b59f3b]';
                            else if (status === 'absent') bgColor = 'bg-[#3a3a3c]';

                            const isSpecialKey = key === 'ENTER' || key === 'BACKSPACE';

                            return (
                                <button
                                    key={key}
                                    onClick={() => onKeyPress(key)}
                                    className={`
                    ${bgColor} text-white font-bold rounded flex items-center justify-center transition-colors duration-150
                    h-14 ${isSpecialKey ? 'px-3 sm:px-4 text-[11px] sm:text-xs flex-[1.5]' : 'flex-1 text-sm sm:text-base max-w-[43px]'}
                    active:scale-95
                  `}
                                >
                                    {key === 'BACKSPACE' ? '⌫' : key}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Stats Modal Overlay */}
            {showStats && (
                <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 
                    ${isStatsFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}
                >
                    <div className="bg-[#121213] border border-[#3a3a3c] text-white w-full max-w-sm rounded-lg p-6 shadow-2xl relative">
                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setIsStatsFadingOut(true);
                                setTimeout(() => {
                                    setShowStats(false);
                                    setIsStatsFadingOut(false); // reset for next time
                                }, 150); // Matches the 0.15s CSS animation
                            }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <h2 className="text-lg font-bold tracking-widest uppercase text-center mb-6 mt-2">Statistics</h2>

                        {/* Top Numbers */}
                        <div className="flex justify-center gap-4 mb-8 text-center">
                            <div className="flex flex-col items-center w-16">
                                <div className="text-3xl font-semibold">{stats.played}</div>
                                <div className="text-[11px] text-gray-300">Played</div>
                            </div>
                            <div className="flex flex-col items-center w-16">
                                <div className="text-3xl font-semibold">
                                    {stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0}
                                </div>
                                <div className="text-[11px] text-gray-300">Win %</div>
                            </div>
                            <div className="flex flex-col items-center w-16">
                                <div className="text-3xl font-semibold">{stats.currentStreak}</div>
                                <div className="text-[11px] text-gray-300 leading-tight">Current<br />Streak</div>
                            </div>
                            <div className="flex flex-col items-center w-16">
                                <div className="text-3xl font-semibold">{stats.maxStreak}</div>
                                <div className="text-[11px] text-gray-300 leading-tight">Max<br />Streak</div>
                            </div>
                        </div>

                        {/* Guess Distribution Bar Chart */}
                        <h3 className="text-md font-bold tracking-wide uppercase mb-3">Guess Distribution</h3>
                        <div className="flex flex-col gap-[6px] w-full mb-8">
                            {stats.distribution.map((count, i) => {
                                const maxCount = Math.max(...stats.distribution, 1);
                                const widthPercent = Math.max((count / maxCount) * 100, 8); // 8% minimum width for the number
                                const isCurrentGame = gameStatus === 'won' && guesses.length === i + 1;

                                return (
                                    <div key={i} className="flex items-center text-sm font-bold">
                                        <div className="w-3 text-center mr-2">{i + 1}</div>
                                        <div className="w-full h-6">
                                            <div
                                                className={`h-full flex items-center justify-end px-2 transition-all duration-1000 ease-out text-white
                                                    ${isCurrentGame ? 'bg-[#538d4e]' : 'bg-[#3a3a3c]'}`}
                                                style={{ width: `${widthPercent}%` }}
                                            >
                                                {count}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Back Home Action */}
                        <div className="flex justify-center">
                            <Link
                                href="/"
                                className="bg-[#538d4e] hover:bg-[#43723f] text-white font-bold py-3 px-8 rounded-full text-lg w-full transition-transform active:scale-95 shadow-lg text-center"
                            >
                                Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}