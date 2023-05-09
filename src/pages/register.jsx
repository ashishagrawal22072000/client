import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { registerRouter } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-data")) navigate("/");
  }, []);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    if (userData.username.length <= 3) {
      toast.error("username is too small");
      return false;
    } else if (userData.password.length <= 3) {
      toast.error("password is too weak");
      return false;
    } else if (userData.confirmPassword != userData.password) {
      toast.error("password and confirmPassword should match");
      return false;
    } else return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      const { username, email, password } = userData;
      axios
        .post(registerRouter, {
          username,
          email,
          password,
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data.data);
          localStorage.setItem("user-data", JSON.stringify(response.data.data));
          toast.success(response.data.message);
          navigate("/set-avatar");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        });
    } else {
      setLoading(false);
    }
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
                type="text"
                placeholder="Username"
                name="username"
                className="w-full outline-0 bg-transparent p-2 text-white"
                onChange={handleChange}
              />
            </div>

            <div className="w-full p-2 border-2 border-indigo-600 my-6">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full outline-0 bg-transparent p-2 text-white"
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
            <div className="w-full p-2 border-2 border-indigo-600 my-6">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="w-full  outline-0 bg-transparent p-2 text-white"
                onChange={handleChange}
              />
            </div>
            <button className="w-full p-5 my-2 text-white bg-indigo-600  hover:border-indigo-600 hover:text-black font-bold hover:transition duration-150">
              {loading ? <div class="loader mx-auto"></div> : "CREATE USER"}
            </button>
          </form>
          <p className="text-center text-white">
            ALREADY HAVE AN ACCOUNT?{" "}
            <a className="text-red-500" href="/login">
              LOGIN
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
