import React, { useState, useEffect } from 'react';

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!running && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, time]);

    const handleStartStop = () => {
        setRunning(!running);
    };

    const handleReset = () => {
        setTime(0);
        setRunning(false);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Stopwatch</h1>
            <p>Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</p>
            <button onClick={handleStartStop}>{running ? 'Stop' : 'Start'}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default Stopwatch;
