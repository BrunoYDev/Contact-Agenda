import { Outlet, useNavigate } from "react-router-dom";
import { LoadingPage } from "../pages/loadingPage";
import { useUser } from "../hooks/UserHook";
export const ProtectedRoutes = () => {
  const { token, isLoading } = useUser()
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!token) {
    window.localStorage.clear();
    navigate("/");
  }

  return (
      <Outlet />
  );
};