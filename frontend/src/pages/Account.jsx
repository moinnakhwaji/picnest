import React from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { pins } = PinData();
  const userPins = pins?.filter((pin) => pin.owner === user._id) || [];

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      <div className="flex flex-col items-center py-8">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center">
              <span className="text-4xl text-zinc-300">
                {user.name.slice(0, 1)}
              </span>
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-center text-zinc-400 mb-4">{user.email}</p>
          <div className="flex justify-center mb-4">
            <button
              onClick={logoutHandler}
              className="bg-zinc-700 px-4 py-2 rounded-lg font-semibold text-zinc-50 hover:bg-zinc-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-center mb-4">Your Pins</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userPins.length > 0 ? (
              userPins.map((pin) => (
                <PinCard key={pin._id} pin={pin} />
              ))
            ) : (
              <p className="text-center text-zinc-400">No Pins Yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
