import { createContext, useContext, useState } from "react";
import { socket } from "./socket";

const PlayerContext = createContext();

function PlayerProvider({ children }) {
  const [playerNo, setPlayerNo] = useState(0);
  const [roomNoVal, setRoomNoVal] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(0)));
  // const [status, setStatus] = useState("initial");
  return (
    <PlayerContext.Provider
      value={{
        playerNo,
        setPlayerNo,
        roomNoVal,
        setRoomNoVal,
        isConnected,
        setIsConnected,
        board,
        setBoard,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  if (PlayerContext === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return useContext(PlayerContext);
}

export { PlayerProvider, usePlayer };
