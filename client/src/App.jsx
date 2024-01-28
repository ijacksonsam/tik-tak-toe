import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.connect();
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.emit("message", message, () => {
      setIsLoading(false);
    });
    setMessage("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
