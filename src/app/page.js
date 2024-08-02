"use client";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [gameState, setGameState] = useState({
    running: false,
    color: "bg-red-600",
    timerStart: null,
    message: "Try your reflexes, who shot first?",
  });

  useEffect(() => {
    let timer;
    const rando = Math.random() * 3000 + 1000;
    if (gameState.running) {
      timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          color: "bg-green-600",
          timerStart: Date.now(),
        }));
      }, rando);
    }
    return () => clearTimeout(timer);
  }, [gameState.running]);

  function handleClick() {
    if (gameState.color === "bg-green-600") {
      setGameState((prev) => ({
        ...prev,
        running: false,
        color: "bg-red-600",
        message: `${Date.now() - prev.timerStart}ms - Han Solo`,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        running: false,
        message: "You failed (Greedo)",
      }));
    }
  }
  console.log(gameState);
  return (
    <div className="grid place-items-center gap-4">
      {gameState.running ? (
        <div
          onClick={handleClick}
          className={`h-24 w-24 ${gameState.color} rounded-full shadow-[1px_2px_3px_3px_rgb(0,0,0,0.3),3.5px_6px_15px_inset_rgb(255,255,235,0.3)] cursor-pointer`}
        ></div>
      ) : (
        <>
          <button
            onClick={() =>
              setGameState({
                running: true,
                color: "bg-red-600",
                timerStart: null,
              })
            }
            className="px-2 py-1 bg-white hover:bg-white/85 active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] shadow-md rounded-md font-semibold text-black"
          >
            Start
          </button>
          <p className="text-white">{gameState.message}</p>
        </>
      )}
    </div>
  );
};

export default Home;
