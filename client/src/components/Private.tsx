import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxStates } from "../Redux/Store";

function Private() {
  const { user } = useSelector((state: ReduxStates) => state.user);
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}

export const AdminProtect = () => {
  const { user } = useSelector((state: ReduxStates) => state.user);

  return user?.name === "Suraj Mate" ? (
    <Outlet />
  ) : (
    <Navigate to={"/notFoud"} />
  );
};

export default Private;
