import React from "react";
import { Howl } from "howler";
import "./App.css";

const App: React.FC = () => {
  const playLeft = () => {
    const sound = new Howl({
      src: ["/audio/snap-sound.mp3"],
    });
    sound.pos(-1, 0, 0);
    sound.play();
  };

  const playRight = () => {
    const sound = new Howl({
      src: ["/audio/snap-sound.mp3"],
    });
    sound.pos(1, 0, 0);
    sound.play();
  };

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
          <button onClick={playLeft} style={{ padding: "12px 10px" }}>
            Som Esquerdo
          </button>
          <button onClick={playRight} style={{ padding: "12px 10px" }}>
            Som Direito
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
