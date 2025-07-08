import { useState, useEffect, useRef } from "react";

const MODES = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export default function Timer() {
  const [mode, setMode] = useState("pomodoro");
  const [time, setTime] = useState(MODES[mode]);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    setTime(MODES[mode]);
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotification();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    if (Notification.permission === "granted") {
      new Notification("⏱ Time's up!", {
        body: `Your ${mode} session has ended.`,
      });
    }
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
>
      {/* Mode Buttons */}
      <div className="flex justify-center space-x-4">
        {Object.keys(MODES).map((key) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-4 py-1 rounded-full border ${
              mode === key
                ? "bg-blue-600 text-white"
                : "bg-gray-800 border-gray-600"
            }`}
          >
            {key === "pomodoro" ? "Pomodoro" : key === "short" ? "Short Break" : "Long Break"}
          </button>
        ))}
      </div>

      {/* Timer */}
      <h2 className="text-5xl font-mono">{formatTime(time)}</h2>

      {/* Start/Pause Button */}
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700"
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="./assets/chime.mp3" />
    </div>
  );
}
