import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ id, image, name, desc }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition"
    >
      <img className="rounded w-full object-cover aspect-square" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1 text-white">{name}</p>
      <p className="text-slate-400 text-sm line-clamp-2">{desc}</p>
    </div>
  );
};

export default AlbumItem;
