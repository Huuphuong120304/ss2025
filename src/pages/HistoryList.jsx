import React, { useEffect, useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaPlay } from "react-icons/fa";

const HistoryList = () => {
  const [history, setHistory] = useState([]);
  const { playWithId } = useContext(PlayerContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/history", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Lỗi tải lịch sử nghe:", err));
  }, []);

  if (history.length === 0) {
    return <p className="text-gray-400">Bạn chưa nghe bài hát nào gần đây.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Lịch sử nghe gần đây</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {history.map((song) => (
          <div
            key={song.id}
            className="bg-[#2c2c2c] p-4 rounded shadow hover:shadow-lg transition relative group"
          >
            <img
              src={song.image}
              alt={song.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-white font-semibold">{song.name}</h3>
            <p className="text-gray-400 text-sm">{song.desc?.slice(0, 50)}...</p>
            <button
              onClick={() => playWithId(song.id)}
              className="absolute bottom-2 right-2 bg-green-500 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Phát lại"
            >
              <FaPlay />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
