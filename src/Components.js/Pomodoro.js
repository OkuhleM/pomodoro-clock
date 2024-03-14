import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pomodoro() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerType, setTimerType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [pause, setPause] = useState(true);
  const starter = useRef(null);

  const changeTime = () => {
    if (timeLeft > 0) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }
    if (timeLeft === 0) {
      if (timerType === "SESSION") {
        console.log(timeLeft);
        setTimerType("BREAK");
        setTimeLeft(breakTime * 60);
        buzzer();
      } else {
        setTimeLeft(sessionTime * 60);
        setTimerType("SESSION");
        buzzer();
      }
    }
  };
  useEffect(() => {
    if (!pause) {
      const interval = setInterval(changeTime, 1000)
      return () => clearInterval(interval)
    }
  })
  const onBreakDecreClick = () => {
    if (breakTime > 0) {
      setBreakTime(breakTime - 1);
      if (timerType === "BREAK") {
        setTimeLeft((breakTime - 1) * 60);
      }
    } else {
      return;
    }
  };
  const onBreakIncreClick = () => {
    setBreakTime(breakTime + 1);
    if (timerType === "BREAK") {
      setTimeLeft((breakTime + 1) * 60);
    }
  };
  const onSessDecreClick = () => {
    if (sessionTime > 0) {
      setSessionTime((sessionTime) => sessionTime - 1);
      if (timerType === "SESSION") {
        setTimeLeft((sessionTime - 1) * 60);
      }
    } else {
      return;
    }
  };
  const onSessIncreClick = () => {
    setSessionTime((sessionTime) => sessionTime + 1);
    if (timerType === "SESSION") {
      setTimeLeft((sessionTime + 1) * 60);
    }
  };
  const buzzer = () => {
    const sound = document.getElementById("beep");
    sound.play();
  };
  const startTimer = () => {
    console.log(sessionTime, breakTime, timeLeft);
    setPause(false);
  };
  const stopTimer = () => {
    setPause(true);
    clearInterval(starter.current);
  };
  const onResetClick = () => {
    stopTimer();
    setBreakTime(5);
    setSessionTime(25);
    setTimerType("SESSION");
    setTimeLeft(1500);
  };
  const onChangePause = () => {
    if (pause) {
      startTimer();
    } else {
      stopTimer();
    }
  };
  const toMMSS = () => {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft - minutes * 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };
  return (
    <div>
      <div>
        <h2 id="break-label">Break Length</h2>
        <div className="break_container">     
        <button id="break-decrement" onClick={onBreakDecreClick}>-</button>
        <span id="break-length">{breakTime}</span>
        <button id="break-increment" onClick={onBreakIncreClick}>+</button>
        </div>
      </div>

      <div className="session-label">
        <h2 id="session-label">Session Length</h2>

        <button id="session-decrement" onClick={onSessDecreClick}>
          -
        </button>
        <span id="session-length">{sessionTime}</span>
        <button id="session-increment" onClick={onSessIncreClick}>
          +
        </button>
      </div>

      <div className="session-container">
        <p id="timer-label">{timerType}</p>
        <p id="time-left">{toMMSS(timeLeft)}</p>
        <div className="btns">
        <button id="start_stop" onClick={onChangePause}>{pause ? " PLAY " : " PAUSE "}</button>
        <button id="reset"
        onClick={onResetClick}>
          <FontAwesomeIcon icon={faRotateRight} />
          <br />
        </button>
        </div>
      </div>

      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />

<footer> OkuhleM &copy;  {new Date().getFullYear()} POMODORO CLOCK </footer>

    </div>
  );
}

export default Pomodoro;
