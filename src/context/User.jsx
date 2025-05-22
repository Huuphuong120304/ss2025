import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [playlistSongs, setPlaylistSongs] = useState([]); // chứa ID các bài hát đã lưu

  const fetchPlaylistSongs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/playlist/1/songs", {
        credentials: "include",
      });
      const data = await res.json();
      setPlaylistSongs(data.map((song) => song.id));
    } catch (err) {
      console.error("Lỗi tải playlist", err);
    }
  };

  const addToPlaylist = async (songId) => {
    try {
      const res = await fetch("http://localhost:5000/api/playlist/1/add_song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ song_id: songId }),
      });

      if (res.ok) {
        setPlaylistSongs((prev) => [...new Set([...prev, songId])]); // cập nhật client
      } else {
        alert("Không thể thêm bài hát.");
      }
    } catch (err) {
      console.error("Lỗi khi thêm bài hát", err);
    }
  };

  useEffect(() => {
    fetchPlaylistSongs();
  }, []);

  return (
    <UserContext.Provider value={{ playlistSongs, addToPlaylist }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
