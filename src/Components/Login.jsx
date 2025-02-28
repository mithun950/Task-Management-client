// components/Login.js
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom"; 

const Login = () => {
  const { googleSignIn, loading, user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
     
     
        <button
          onClick={googleSignIn}
          className="bg-white shadow-2xl  text-black font-bold px-6 py-3 rounded"
        >
          Sign in with Google
        </button>
      )}
     
    </div>
  );
};

export default Login;
