import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();

  return (
    <div className="bg-zinc-900 min-h-screen py-10">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pins && pins.length > 0 ? (
              pins.map((e, i) => <PinCard key={i} pin={e} index={i} />)
            ) : (
              <p className="text-white">No Pins Yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
