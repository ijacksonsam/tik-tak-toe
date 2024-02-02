import { useNavigate } from "react-router-dom";
import { usePlayer } from "./PlayerContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { roomNoVal } = usePlayer();
  const navigate = useNavigate();
  useEffect(function () {
    if (!roomNoVal) {
      navigate("/roomform");
    }
  }, []);
  if (roomNoVal) return children;
}

export default ProtectedRoute;
