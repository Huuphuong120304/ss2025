// File: src/pages/RecommendList.jsx
import React, { useEffect, useState } from 'react';
import SongItem from '../components/SongItem';

const RecommendList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/recommend_by_genre', {
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

  if (loading) return <div className="text-white">Đang tải gợi ý...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">🎧 Gợi ý theo thể loại bạn thường nghe</h2>
      <div className="flex flex-wrap gap-4">
        {songs.map(song => (
          <SongItem key={song.id} {...song} />
        ))}
      </div>
    </div>
  );
};

export default RecommendList;
