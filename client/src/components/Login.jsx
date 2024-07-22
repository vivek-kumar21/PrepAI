// components/Login.js
import image from "../assets/login-bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState, useContext } from "react";
import { URL } from "../url";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Loading from "./Loading";

const Login = ({ toggleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { setIsAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${URL}/api/users/login`, {
        email,
        password,
      });

      const data = await res.data;
      setIsAuth(true);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${URL}/auth/google`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full max-w-[400px] h-[85vh] rounded-l-xl overflow-hidden flex flex-col">
        <img
          src={image}
          className="w-full h-full object-cover"
          alt="Login Background"
        />
      </div>
      <div className="w-full max-w-[400px] h-[85vh] rounded-r-xl bg-gray-100 flex flex-col items-center justify-between p-6 md:p-12 relative transition-transform duration-300 ease-in-out">
        <IoClose
          onClick={toggleLogin}
          className="absolute top-3 right-3 text-3xl md:text-4xl cursor-pointer"
        />
        <div className="w-full flex flex-col max-w-[400px]">
          <div className="w-full flex flex-col mb-3">
            <h3 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
              Login
            </h3>
            <p className="text-sm md:text-base mb-2 md:mb-4">
              Welcome back! Please enter your details
            </p>
          </div>

          <div className="w-full flex flex-col mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full py-2 md:py-3 px-4 mb-2 md:mb-3 bg-gray-100 border border-gray-200 rounded-lg outline-none focus:outline-none text-sm md:text-base"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full py-2 md:py-3 px-3 mb-2 md:mb-3 bg-gray-100 border border-gray-200 rounded-lg outline-none focus:outline-none text-sm md:text-base"
            />
          </div>

          {error && <p className="text-sm text-red-500 -mt-3">{error}</p>}

          <div className="w-full flex items-center justify-end mb-3">
            <p className="text-xs md:text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              Forget Password
            </p>
          </div>

          <div className="w-full flex flex-col mb-3">
            <button
              onClick={handleLogin}
              className="w-full py-1 md:py-2 px-3 text-white mb-2 md:mb-3 border bg-[#060606] hover:bg-white hover:text-black hover:border-black hover:border duration-300 rounded-md text-center flex items-center justify-center cursor-pointer text-sm md:text-base"
            >
              {isLoading ? <Loading /> : <p>Login</p>}
            </button>
          </div>

          <div className="w-full flex items-center justify-center mb-3">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-xs md:text-lg absolute text-black/70 bg-gray-100 px-2">
              OR
            </p>
          </div>

          <div className="w-full flex flex-col mb-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-1 md:py-2 px-3 border bg-gray-100 hover:bg-gray-200 hover:text-black hover:border-black hover:border duration-300 rounded-md text-center flex items-center justify-center cursor-pointer text-sm md:text-base"
            >
              <FcGoogle className="mr-2" size={25} />
              Continue with Google
            </button>
          </div>
        </div>

        <div className="w-full flex items-center justify-center mb-3">
          <p className="text-xs md:text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="font-medium underline underline-offset-2 cursor-pointer">
                Signup for free
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
