import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import Login from "./Login";
import Signup from "./Signup";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { URL } from "../url";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);
  // console.log(user);

  const logoutUser = async () => {
    const res = await axios.post(`${URL}/api/users/logout`, null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable to logout user");
  };

  const handleLogout = async () => {
    logoutUser()
      .then(() => {
        setIsAuth(false);
        setUser({});
      })
      .catch((err) => console.log(err));
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div>
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <NavLink className="block text-teal-600" to="/">
                <span className="sr-only">Home</span>
                <img className="md:w-32 w-28" src={logo} alt="logo" />
              </NavLink>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-md">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `text-gray-500 transition hover:text-teal-600 ${
                          isActive ? "text-teal-600" : ""
                        }`
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `text-gray-500 transition hover:text-teal-600 ${
                          isActive ? "text-teal-600" : ""
                        }`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <button
                  className={`rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer ${
                    isAuth && "hidden"
                  }`}
                  onClick={toggleLogin}
                >
                  Login
                </button>

                <button
                  onClick={handleLogout}
                  className={`rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200 ${
                    !isAuth && "hidden"
                  }`}
                >
                  Logout
                </button>

                <div
                  className={`rounded-full bg-gray-300 text-gray-800 w-9 h-9 flex items-center justify-center border-2 border-teal-400 ${
                    !isAuth && "hidden"
                  }`}
                >
                  {user && user.username.charAt(0).toUpperCase()}
                </div>

                <button
                  className={`rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200 ${
                    isAuth && "hidden"
                  }`}
                  onClick={toggleSignup}
                >
                  Register
                </button>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-teal-300 via-blue-700 to-sky-300"></div>
      </header>
      <div className="h-16"></div>
      {showLogin && <Login toggleLogin={toggleLogin} />}{" "}
      {showSignup && <Signup toggleSignup={toggleSignup} />}{" "}
    </div>
  );
};

export default Navbar;
