import React, { useEffect, useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { useUserData } from '../context/User'; // Chứa addToPlaylist, playlistSongs
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const RecommendList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { playWithId } = useContext(PlayerContext);
  const { addToPlaylist, playlistSongs } = useUserData();

  useEffect(() => {
    fetch('http://localhost:5000/api/recommend_hybrid', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSongs(data);
        } else {
          setError(data.error || "Không có gợi ý nào.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải dữ liệu.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div >      
      <div className="flex  overflow-x-auto">
        {songs.slice(0, 12).map((song) => {
          const isSaved = playlistSongs.includes(song.id);
          const handleSave = (e) => {
            e.stopPropagation();
            if (!isSaved) addToPlaylist(song.id);
          };

          return (
            <div
              key={song.id}
              onClick={() => playWithId(song.id,songs)}
              className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative"
            >
              <div className="relative rounded overflow-hidden">
                <img className="rounded w-[156px] h-[156px] object-cover" src={song.image} alt={song.name} />               
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
              </div>

              <p className="font-bold text-white mt-2 mb-1 truncate">{song.name}</p>
              <p className="text-slate-300 text-sm truncate">{song.desc}</p>

              <button
                onClick={handleSave}
                className="absolute bottom-2 right-2 text-white bg-green-500 p-2 rounded-full shadow hover:bg-green-600"
                title="Lưu vào playlist"
              >
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendList;
