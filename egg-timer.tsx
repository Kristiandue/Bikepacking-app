import React, { useState } from 'react';
export default EggTimer;

function EggTimer() {
    let hardness = [360, 480, 600];
    let hardnessCounter = 1;
    
    let timer = hardness[hardnessCounter];
    let timerEl = document.getElementById("timer");

    console.log(timerEl);

    function setHardness() {
        hardnessCounter += 1;
        if (hardnessCounter > 2) {
            hardnessCounter = 0;
        }
        timerEl!.innerText = (hardness[hardnessCounter] / 60).toString() + ":00";
    }
    function startTimer() {
        const countdown = setInterval(() => {
            if (timer > 0) {
                timer -= 1;
                const minutes = Math.floor(timer / 60);
                const seconds = timer % 60;
                timerEl!.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
                clearInterval(countdown);
                alert("Time's up!");
            }
        }, 1000);
    }
    return(
        <div className="egg-timer">
            <div className="egg-timer-contents">
                <p>Egg Timer</p>
                <p id="timer">8:00</p>
                <button className="eggtimer-buttons" onClick={startTimer}>Start timer</button>
                <button className="eggtimer-buttons" onClick={setHardness}>Hardness</button>
            </div>
        </div>
    );
}