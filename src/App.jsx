import React, { useState, useEffect } from 'react';
import { Hourglass, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_TIME = 25 * 60;

export default function App() {
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (interval) clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(DEFAULT_TIME);
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={false}
            >
                <div className="capsule-content">
                    {/* Hourglass Icon */}
                    <motion.div
                        animate={{
                            rotate: isActive ? [0, 180] : 0
                        }}
                        transition={{
                            duration: 2,
                            repeat: isActive ? Infinity : 0,
                            ease: "easeInOut"
                        }}
                        className={`icon-container ${isActive ? 'icon-active' : ''}`}
                    >
                        <Hourglass size={20} />
                    </motion.div>

                    {/* Timer Display */}
                    <div className="timer-display">
                        {formatTime(timeLeft)}
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
