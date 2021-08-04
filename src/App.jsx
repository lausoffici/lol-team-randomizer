import React, { useState, useEffect } from "react";
import "./App.scss";
import { shuffle } from "./utils";

const commonPlayers = [
  "LATA",
  "RIJA",
  "SALSA",
  "BOYTA",
  "PANCHO",
  "FRANCA",
  "FACHIMONGO",
  "FEDELWAY",
  "LOWI",
  "NAWE",
  "FACUPEH",
  "SALAH",
];

function App() {
  const [suggestions, setSuggestions] = useState(commonPlayers);
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  useEffect(() => {
    setSuggestions(commonPlayers.filter((s) => !players.includes(s)));
  }, [players]);

  const addPlayer = (name) => {
    if (!name || players.length === 10) return;
    if (!players.includes(name)) {
      setPlayers([...players, name]);
    }
  };

  const removePlayer = (e) => {
    const name = e.target.textContent;
    setPlayers(players.filter((p) => p !== name));
  };

  const onSubmitPlayer = (e) => {
    e.preventDefault();
    addPlayer(newPlayer.toUpperCase());
    setNewPlayer("");
  };

  const buildTeams = () => {
    const playersCopy = [...players];
    const shuffledPlayers = shuffle(playersCopy);
    setTeam1(shuffledPlayers.filter((_, index) => index < 5));
    setTeam2(shuffledPlayers.filter((_, index) => index >= 5));
  };

  return (
    <div className="app-content">
      <h1>Se pica la custom?</h1>

      <ul className="players-suggestions">
        {suggestions.map((player) => (
          <li key={player} onClick={(e) => addPlayer(e.target.textContent)}>
            {player}
          </li>
        ))}
      </ul>
      <form className="add-player" onSubmit={onSubmitPlayer}>
        <input
          value={newPlayer}
          type="text"
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="name ..."
        />
        <button disabled={players.length >= 10}>Agregar</button>
      </form>
      <div className="players-teams-container">
        <div>
          <h2>Jugadores</h2>
          <ol className="players">
            {players.map((player) => (
              <li onClick={removePlayer} key={player}>
                {player}
              </li>
            ))}
          </ol>
        </div>
        {team1.length ? (
          <div>
            <h2>Equipos</h2>
            <div className="teams">
              <div className="team">
                <ul>
                  {team1.map((player) => (
                    <li key={player}>{player}</li>
                  ))}
                </ul>
              </div>
              <div className="team">
                <ul>
                  {team2.map((player) => (
                    <li key={player}>{player}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <button
        style={{ margin: "20px 0" }}
        disabled={players.length !== 10}
        onClick={buildTeams}
      >
        RANDOM
      </button>
    </div>
  );
}

export default App;
