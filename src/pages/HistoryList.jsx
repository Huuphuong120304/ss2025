import React, { useEffect, useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { useUserData } from '../context/User'; // context người dùng để lưu bài
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';


const HistoryList = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const { playWithId } = useContext(PlayerContext);
const { addToPlaylist, playlistSongs } = useUserData();


  useEffect(() => {
    fetch('http://localhost:5000/api/user/history', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setError(data.error || "Không có dữ liệu lịch sử.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải lịch sử nghe:", err);
        setError("Không thể tải dữ liệu.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (history.length === 0) {
    return <p className="text-gray-400">Bạn chưa nghe bài hát nào gần đây.</p>;
  }

  return (
    <div>
      <div className="flex overflow-x-auto">
        {history.slice(0, 12).map((song, index) => {
          const isSaved = playlistSongs.some((s) => s.id === song.id);

          return (
            <div
              key={`${song.id}-${index}`}
              onClick={()=>playWithId(song.id,history)}
              className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group"
            >
              <div className="relative rounded overflow-hidden">
                <img
                  className="rounded w-[156px] h-[156px] object-cover"
                  src={song.image}
                  alt={song.name}
                />
                
              </div>

              <p className="font-bold text-white mt-2 mb-1 truncate">{song.name}</p>
              <p className="text-slate-300 text-sm truncate">{song.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;
