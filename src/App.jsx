import React, { useState, useEffect } from "react";
import "./App.scss";
import { shuffle } from "./utils";

const commonPlayers = [
  "LATA",
  "RIJA",
  "BOYTA",
  "FRANCA",
  "NAWE",
  "FACUPEH",
  "SALAH",
  "SOMBRA",
  "FEDO",
  "CRUZITO",
  "SALSA",
  "T2",
  "FACHIMONGO",
  "PANCHO",
  "FEDELWAY",
  "TONGA",
  "JUFE",
  "LUKS",
  "MOLE",
];

function App() {
  const [suggestions, setSuggestions] = useState(commonPlayers);
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const fullPlayers = players.length === 10;

  useEffect(() => {
    setSuggestions(commonPlayers.filter((s) => !players.includes(s)));
  }, [players]);

  const addPlayer = (name) => {
    if (!name || fullPlayers) return;
    if (!players.includes(name)) {
      setPlayers([...players, name]);
    }
  };

  const removePlayer = (e) => {
    const name = e.target.textContent;
    setPlayers(players.filter((p) => p !== name));
    setTeam1([]);
    setTeam2([]);
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

  const teamsToString = () =>
    `Team 1: \n${team1[0]}\n${team1[1]}\n${team1[2]}\n${team1[3]}\n${team1[4]}\n\nTeam 2:\n${team2[0]}\n${team2[1]}\n${team2[2]}\n${team2[3]}\n${team2[4]}`;

  return (
    <div className="app-content">
      <h1>Random Team Builder</h1>
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
          disabled={fullPlayers}
        />
        <button disabled={fullPlayers || !newPlayer}>Add</button>
      </form>
      <div className="players-teams-container">
        {players.length ? (
          <div>
            <h2>Players</h2>
            <ol className="players">
              {players.map((player) => (
                <li onClick={removePlayer} key={player}>
                  {player}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {team1.length && team2.length && fullPlayers ? (
          <div>
            <h2>Teams</h2>
            <div className="teams">
              <ul>
                {team1.map((player) => (
                  <li className="team-1-player" key={player}>
                    {player}
                  </li>
                ))}
              </ul>
              <ul>
                {team2.map((player) => (
                  <li className="team-2-player" key={player}>
                    {player}
                  </li>
                ))}
              </ul>
            </div>
            <img
              className="copy-to-clipboard"
              onClick={() => {
                navigator.clipboard.writeText(teamsToString());
              }}
              src="/copy.svg"
              role="button"
            />
          </div>
        ) : null}
      </div>
      {fullPlayers ? (
        <button
          style={{ margin: "20px 0" }}
          disabled={!fullPlayers}
          onClick={buildTeams}
        >
          Randomize
        </button>
      ) : null}
    </div>
  );
}

export default App;
