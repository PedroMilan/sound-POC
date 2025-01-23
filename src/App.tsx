import React from "react";
import { useWithSound } from "./useWithSound";
import "./App.css";

const App: React.FC = () => {
  const leftSound = useWithSound("/audio/snap-sound.mp3", -1);
  const rightSound = useWithSound("/audio/snap-sound.mp3", 1);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Controle de Som</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "25px",
          }}
        >
          <button
            onClick={leftSound.playSound}
            style={{ padding: "12px 10px" }}
          >
            Som Esquerdo
          </button>
          <button
            onClick={rightSound.playSound}
            style={{ padding: "12px 10px" }}
          >
            Som Direito
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
