import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomForm from "./RoomForm";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { Toaster } from "react-hot-toast";
import { usePlayer } from "./PlayerContext";
import Game from "./Game";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const { setIsConnected, roomNoVal } = usePlayer();
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.disconnect();
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/roomform" element={<RoomForm />} />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </>
  );
}

export default App;

function Home() {
  return <div>Home</div>;
}
