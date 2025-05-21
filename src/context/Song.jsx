import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api";

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${API}/albums`, {
        withCredentials: true
      });
      setAlbums(res.data);
    } catch (err) {
      console.error("Failed to fetch albums", err);
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${API}/songs`, {
        withCredentials: true
      });
      setSongs(res.data);
    } catch (err) {
      console.error("Failed to fetch songs", err);
    }
  };

  const addAlbum = async (formData, reset) => {
    setLoading(true);
    try {
      await axios.post(`${API}/album/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      await fetchAlbums();
      reset();
    } catch (err) {
      console.error("Error uploading album", err);
      alert("Error uploading album");
    } finally {
      setLoading(false);
    }
  };

  const addSong = async (formData, reset) => {
    setLoading(true);
    try {
      await axios.post(`${API}/song/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      await fetchSongs();
      reset();
    } catch (err) {
      console.error("Error uploading song", err);
      alert("Error uploading song");
    } finally {
      setLoading(false);
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`${API}/song/${id}`, {
        withCredentials: true
      });
      await fetchSongs();
    } catch (err) {
      console.error("Failed to delete song", err);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <SongContext.Provider
      value={{ albums, songs, loading, addAlbum, addSong, deleteSong }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = () => useContext(SongContext);
