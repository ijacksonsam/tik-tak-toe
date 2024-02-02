import { useEffect } from "react";
import { usePlayer } from "./PlayerContext";
import { socket } from "./socket";

function Game() {
  const { playerNo, roomNoVal, board, setBoard } = usePlayer();

  function updateBoard(row, col, playerNo) {
    setBoard((prevBoard) => {
      const newBoard = [];
      for (let i = 0; i < prevBoard.length; i++) {
        newBoard.push([]);
        for (let j = 0; j < prevBoard[i].length; j++) {
          if (prevBoard[i][j] !== 0) {
            newBoard[i].push(prevBoard[i][j]);
            continue;
          }
          if (i === row && j === col) {
            newBoard[i].push(playerNo);
          } else {
            newBoard[i].push(prevBoard[i][j]);
          }
        }
      }
      return newBoard;
    });
  }

  useEffect(function () {
    function onMove({ row, col, playerNo: pno }) {
      console.log({ row, col, pno });
      // if (pno === playerNo) return;
      updateBoard(row, col, pno);
    }
    socket.on("move", onMove);

    return () => {
      socket.off("move", onMove);
    };
  }, []);

  function handleClick(row, col) {
    updateBoard(row, col, playerNo);
    socket.emit("move", { row, col, playerNo, roomNoVal });
  }

  return (
    <div className="flex gap-6 flex-col">
      <p>
        Welcome player{playerNo} to room {roomNoVal}
      </p>
      <div className="grid grid-cols-3 justify-items-stretch">
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <button
              key={[rowIndex, colIndex]}
              className="border border-black h-32 w-32"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {col === 0 ? "" : col === 1 ? "X" : "O"}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Game;
