import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRouter } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-data")) navigate("/");
  }, []);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = userData;
    axios
      .post(loginRouter, { email, password })
      .then((response) => {
        setLoading(true);
        console.log(response.data.data);
        localStorage.setItem("user-data", JSON.stringify(response.data.data));
        toast.success(response.data.message);
        navigate("/set-avatar");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="bg-black px-10 py-10 flex-col h-5/5 w-4/5 lg:w-2/5">
          <h1 className="text-2xl text-white font-bold text-center my-2">
            Fast Chat
          </h1>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full p-2 border-2 border-indigo-600 my-6">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full outline-0 bg-transparent p-2 text-white"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="w-full p-2 border-2 border-indigo-600 my-6">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full  outline-0 bg-transparent p-2 text-white"
                onChange={handleChange}
              />
            </div>

            <button className="w-full p-5 my-2 text-white bg-indigo-600  hover:border-indigo-600 hover:text-black font-bold hover:transition duration-150">
              {loading ? <div className="loader mx-auto"></div> : "LOGIN USER"}
            </button>
          </form>
          <p className="text-center text-white">
            DON'T HAVE AN ACCOUNT?{" "}
            <a className="text-red-500" href="/register">
              REGISTER
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
