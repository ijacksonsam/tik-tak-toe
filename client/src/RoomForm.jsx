import { useState } from "react";
import { socket } from "./socket";
import Button from "./Button";
import toast from "react-hot-toast";
import { usePlayer } from "./PlayerContext";
import { useNavigate } from "react-router-dom";

function RoomForm() {
  const [roomNo, setRoomNo] = useState("");
  const { setPlayerNo, setRoomNoVal } = usePlayer();
  const navigate = useNavigate();

  function handleCreateRoom() {
    socket.emit("create-room", roomNo, (response) => {
      if (response.status === "error") {
        toast.error(response.message);
        navigate("error");
      } else {
        toast.success(response.message);
        setRoomNo("");
        setPlayerNo(1);
        setRoomNoVal(roomNo);
        navigate("/game");
      }
    });
  }
  function handleJoinRoom() {
    socket.emit("join-room", roomNo, (response) => {
      if (response.status === "error") {
        toast.error(response.message);
        navigate("error");
      } else {
        toast.success(response.message);
        setRoomNo("");
        setPlayerNo(2);
        setRoomNoVal(roomNo);
        navigate("/game");
      }
    });
  }

  return (
    <div>
      <p className="text-center uppercase">Room Form</p>
      <div className="border border-black flex p-4 flex-col gap-y-3 ">
        <div className="flex gap-4">
          <label htmlFor="roomNo">Room No</label>
          <input
            type="text"
            id="roomNo"
            className="border border-black px-4"
            placeholder="enter room no."
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateRoom}>Create Room</Button>
        <Button onClick={handleJoinRoom}>Join Room</Button>
      </div>
    </div>
  );
}

export default RoomForm;
