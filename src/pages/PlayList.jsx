import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSongData } from "../context/Song";
import { assets } from "../assets/assets";
import { FaBookmark, FaPlay, FaTrash } from "react-icons/fa";
import { FastAverageColor } from "fast-average-color";
import { useBackground } from "../context/BackgroundContext";


const PlayList = () => {
  const { setSelectedSong, setIsPlaying } = useSongData();
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState(null); 
  const { playlistId } = useParams();
  const { setBgColor ,bgColor } = useBackground();

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/playlist/${playlistId}/songs`, {
          credentials: "include"
        });
        const data = await res.json();
        setMyPlaylist(data);
      } catch (err) {
        console.error("Lỗi khi tải playlist:", err);
      }
    };

    const fetchPlaylistInfo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/playlist/${playlistId}`);
        const data = await res.json();
        setPlaylistInfo(data);
      } catch (err) {
        console.error("Lỗi khi tải thông tin playlist:", err);
      }
    };

    fetchPlaylistSongs();
    fetchPlaylistInfo();
  }, [playlistId]);

useEffect(() => {
  if (playlistInfo?.image) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = playlistInfo.image;

    img.onload = async () => {
      try {
        const fac = new FastAverageColor();
        const color = await fac.getColorAsync(img);
        setBgColor(color.hex);
      } catch (err) {
        console.warn("Không lấy được màu từ ảnh:", err);
      }
    };
  }
}, [playlistInfo]);
 

  const onClickPlay = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const removeFromPlaylist = async (songId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/playlist/${playlistId}/remove_song`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ song_id: songId }),
      });

      if (res.ok) {
        setMyPlaylist((prev) => prev.filter((song) => song.id !== songId));
      }
    } catch (err) {
      console.error("Lỗi khi xoá bài hát", err);
    }
  };

  return (
    <div
      className="min-h-screen text-white p-6 transition-all "
      
    >
      {/* Playlist info */}
      <div className="mt-4 flex gap-8 flex-col md:flex-row md:items-center">
        <img
          src={playlistInfo?.image || "https://via.placeholder.com/250"}
          className="w-48 rounded"
          alt="playlist"
        />
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">Playlist</p>
          <h2 className="text-3xl font-bold mb-2 md:text-5xl">{playlistInfo?.name || "Playlist"}</h2>
          <h4 className="text-gray-300">{playlistInfo?.desc || "Your favorite songs"}</h4>
          <p className="mt-2">
            <img src={assets.melodify_logo} className="inline-block w-6" alt="logo" />
          </p>
        </div>
      </div>

      {/* Table header */}
        <div className="grid grid-cols-5 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Artist</p>
        <p className="hidden sm:block">Description</p>
        <p className="hidden sm:block">Duration</p>
        <p className="text-center">Actions</p>
        </div>
        <hr />

        {/* Playlist songs */}
        {myPlaylist.length > 0 ? myPlaylist.map((song, i) => (
        <div
            key={song.id}
            className="grid grid-cols-5 mt-6 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
            <p className="text-white flex items-center gap-2">
            <b className="text-[#a7a7a7]">{i + 1}</b>
            <img src={song.image} className="w-10 rounded" alt="" />
            {song.name}
            </p>
            <p className="text-sm truncate">{song.artist || 'Unknown'}</p>
            <p className="text-sm hidden sm:block">{song.desc?.slice(0, 30)}...</p>
            <p className="text-sm hidden sm:block">{song.duration || '00:00'}</p>
            <p className="flex justify-center items-center gap-4">            
            <span onClick={() => removeFromPlaylist(song.id)} className="cursor-pointer text-white-400"><FaBookmark /></span>
            </p>
        </div>
      )) : (
        <p className="text-gray-500 mt-4">Playlist empty</p>
      )}
    </div>
  );
};

export default PlayList;
