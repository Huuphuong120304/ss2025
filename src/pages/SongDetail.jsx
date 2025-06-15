import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { useBackground } from "../context/BackgroundContext";
import { FastAverageColor } from "fast-average-color";

const DisplaySong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [related, setRelated] = useState([]);
  const { playWithId } = useContext(PlayerContext);
  const { setBgColor } = useBackground();
 


  useEffect(() => {
    fetch(`http://localhost:5000/api/song/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setSong(data);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = data.image;
        img.onload = async () => {
          try {
            const fac = new FastAverageColor();
            const color = await fac.getColorAsync(img);
            setBgColor(color.hex);
          } catch (err) {
            console.warn("Unable to get image color:", err);
          }
        };
      });
  }, [id, setBgColor]);

  useEffect(() => {
    if (song?.genre) {
      fetch(`http://localhost:5000/api/song/search?q=${song.genre}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((s) => s.id !== parseInt(id));
          setRelated(filtered);
        });
    }
  }, [song, id]);

  if (!song) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={song.image}
          alt={song.name}
          className="w-[220px] h-[220px] rounded object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{song.name}</h1>
          <p className="text-white text-sm mb-3">{song.desc}</p>
          <div className="space-y-1 text-sm text-white">
            <p><strong>ID:</strong> {song.id}</p>
            <p><strong>Album:</strong> {song.album_name ?? "Unknown"}</p>
            <p><strong>Genre:</strong> {song.genre}</p>
            <p><strong>Duration:</strong> {song.duration}</p>
            <p>
              <strong>Created at:</strong>{" "}
              {song.created_at
                ? new Date(song.created_at).toLocaleString("vi-VN")
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <div className="mt-16" />
          <h2 className="text-xl font-semibold mt-10 mb-3">Other Songs</h2>
          <div className="mt-8" />

          <div className="grid grid-cols-3 sm:grid-cols-4 mt-2 mb-2 pl-2 text-[#a7a7a7]">
            <p><b className="mr-4">#</b>Title</p>
            <p>Album</p>
            <p className="hidden sm:block">Date Added</p>
            <p className="text-center">Duration</p>
          </div>
          <hr />

          {related.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={()=>{
                playWithId(item.id, related);
                navigate(`/song/${item.id}`);
              }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white">
                <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                <img className="inline w-10 h-10 mr-4 rounded object-cover" src={item.image} alt={item.name} />
                <span className="hover:underline">{item.name}</span>
              </p>
              <p className="text-[15px]">{item.album_name ?? "Unknown"}</p>
              <p className="text-[15px] hidden sm:block">{item.created_at ? new Date(item.created_at).toLocaleDateString("vi-VN") : "—"}</p>
              <p className="text-[15px] text-center">{item.duration}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplaySong;
