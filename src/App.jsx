import React, { useState, useEffect } from 'react';
import { Hourglass, Coffee, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function App() {
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' | 'break'

    const enterBreakMode = async () => {
        setMode('break');
        setTimeLeft(BREAK_TIME);
        setIsActive(true); // auto start break

        try {
            const { getCurrentWindow, LogicalSize } = await import('@tauri-apps/api/window');
            const window = getCurrentWindow();
            await window.setSize(new LogicalSize(300, 60));
        } catch (e) {
            console.error("Failed to set window size:", e);
        }
    };

    const enterWorkMode = async () => {
        setMode('work');
        setTimeLeft(WORK_TIME);
        setIsActive(false);

        try {
            const { getCurrentWindow, LogicalSize } = await import('@tauri-apps/api/window');
            const window = getCurrentWindow();
            await window.setSize(new LogicalSize(280, 60));
        } catch (e) {
            console.error("Failed to restore window size:", e);
        }
    };

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            if (interval) clearInterval(interval);

            if (mode === 'work') {
                enterBreakMode();
            } else {
                enterWorkMode();
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'break') {
            enterWorkMode();
        } else {
            setTimeLeft(WORK_TIME);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="capsule-container">
            <motion.div
                className={`capsule ${isHovered ? 'expanded' : 'collapsed'}`}
                style={{
                    width: isHovered ? (mode === 'break' ? 300 : 280) : (mode === 'break' ? 175 : 140)
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={false}
            >
                <div className="capsule-content">
                    {/* Mode Icon */}
                    <motion.div
                        key={mode}
                        animate={
                            mode === 'work'
                                ? { rotate: isActive ? [0, 180] : 0 }
                                : { scale: isActive ? [1, 1.1, 1] : 1 }
                        }
                        transition={{
                            duration: 2,
                            repeat: isActive ? Infinity : 0,
                            ease: "easeInOut"
                        }}
                        className={`icon-container ${isActive ? 'icon-active' : ''}`}
                    >
                        {mode === 'work' ? <Hourglass size={20} /> : <Coffee size={20} />}
                    </motion.div>

                    {/* Timer Display */}
                    <div className="timer-display" style={{
                        fontSize: mode === 'break' ? '1rem' : '1.35rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                    }}>
                        {mode === 'break' && <span style={{ fontWeight: 'bold' }}>BREAK</span>}
                        <span>{formatTime(timeLeft)}</span>
                    </div>

                    {/* Controls */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="controls"
                            >
                                <button
                                    onClick={toggleTimer}
                                    className="btn"
                                    title={isActive ? "Pause" : "Start"}
                                >
                                    {isActive ? <Pause size={18} /> : <Play size={18} />}
                                </button>
                                <button
                                    onClick={resetTimer}
                                    className="btn"
                                    title="Reset"
                                >
                                    <RotateCcw size={18} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
