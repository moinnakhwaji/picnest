import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import { UserData } from "../context/UserContext";

const UserProfile = ({ user: loggedInUser }) => {
  const params = useParams();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  const [isFollow, setIsFollow] = useState(false);
  const { followUser } = UserData();

  const followHandler = () => {
    setIsFollow(!isFollow);
    followUser(user._id, fetchUser);
  };

  const followers = user?.followers || [];
  const following = user?.following || [];

  useEffect(() => {
    if (followers.includes(loggedInUser._id)) setIsFollow(true);
  }, [user, loggedInUser._id, followers]);

  const { pins } = PinData();
  const userPins = pins?.filter((pin) => pin.owner === user?._id) || [];

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      {user && (
        <div className="flex flex-col items-center py-8">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center">
                {user.name && (
                  <span className="text-4xl text-zinc-300">
                    {user.name.slice(0, 1)}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-center text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-center text-zinc-400 mb-2">{user.email}</p>
            <p className="flex justify-center text-center gap-4 text-zinc-400 mb-4">
              {followers.length > 0 && <span>{followers.length} followers</span>}
              {following.length > 0 && <span>{following.length} following</span>}
            </p>
            {user._id !== loggedInUser._id && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={followHandler}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    isFollow ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isFollow ? "Unfollow" : "Follow"}
                </button>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-6">
              {userPins.length > 0 ? (
                userPins.map((pin) => <PinCard key={pin._id} pin={pin} />)
              ) : (
                <p className="text-zinc-400">No Pins Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
