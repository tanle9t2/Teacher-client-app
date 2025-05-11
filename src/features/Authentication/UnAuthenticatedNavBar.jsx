import { useNavigate } from "react-router-dom";

function UnAuthenticatedNavBar() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 px-3">
      <button
        onClick={() => navigate("/auth/login")}
        className="px-4 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-md hover:bg-purple-50 transition"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/auth/register")}
        className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
      >
        Register
      </button>
    </div>
  );
}

export default UnAuthenticatedNavBar;
