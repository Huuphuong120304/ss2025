import React, { useEffect, useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { useUserData } from '../context/User';
import Song from '../components/Songs';


const LatestSongsList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { playWithId } = useContext(PlayerContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs/latest', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSongs(data);
        else setError("Không có dữ liệu bài hát.");
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải dữ liệu.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-white">Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">      
      <div className="flex overflow-x-auto gap-4">
        {songs.map((song) => (
          <Song key={song.id} {...song} queue={songs} />
        ))}
      </div>
    </div>
  );
};

export default LatestSongsList;
