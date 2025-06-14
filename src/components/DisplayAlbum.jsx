import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';
import { FastAverageColor } from 'fast-average-color';
import { useBackground } from '../context/BackgroundContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);
  const { setBgColor } = useBackground();

  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAlbumAndSongs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/album/${id}`, {
          credentials: "include",
        });
        const albumData = await res.json();
        setAlbum(albumData);

        // Tính màu trung bình từ ảnh
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = albumData.image;
        img.onload = async () => {
          try {
            const fac = new FastAverageColor();
            const color = await fac.getColorAsync(img);
            setBgColor(color.hex);
          } catch (err) {
            console.warn("Không thể lấy màu từ ảnh:", err);
          }
        };

        const songRes = await fetch(`http://localhost:5000/api/album/${id}/songs`, {
          credentials: "include",
        });
        const songData = await songRes.json();
        setSongs(songData);
      } catch (error) {
        console.error("Error loading album or songs:", error);
      }
    };

    fetchAlbumAndSongs();
  }, [id, setBgColor]);

  const timeAgo = (dateStr) => {
    const now = new Date();
    const past = new Date(dateStr);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
    return `${Math.floor(diff / 31536000)} years ago`;
  };

  const parseDuration = (timeStr) => {
    const [min, sec] = timeStr.split(':').map(Number);
    return min * 60 + sec;
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs} hr ${mins} min`;
    return `${mins} min ${secs} sec`;
  };

  const totalDuration = useMemo(() => {
    const totalSeconds = songs.reduce((sum, song) => {
      if (song.duration && song.duration.includes(":")) {
        return sum + parseDuration(song.duration);
      }
      return sum;
    }, 0);
    return formatDuration(totalSeconds);
  }, [songs]);

  if (!album) return <div className="text-white p-4">Loading album...</div>;

  return (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={album.image} alt={album.name} />
        <div className="flex flex-col">
          <p>Album</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album.name}</h2>
          <h4>{album.desc}</h4>
          <p className="mt-1">
            <img className="inline-block w-5" src={assets.melodify_logo} alt="" />
            <b> Melodify</b> • {songs.length} songs • <b>{totalDuration}</b>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />

      {songs.map((item, index) => (
        <div
          onClick={() => playWithId(item.id)}
          key={`${item.id}-${index}`}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt={item.name} />
            {item.name}
          </p>
          <p className="text-[15px]">{album.name}</p>
          <p className="text-[15px] hidden sm:block" title={item.created_at}>
            {item.created_at ? timeAgo(item.created_at) : "—"}
          </p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
