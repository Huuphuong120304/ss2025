import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/playlist/user", {
          credentials: "include"
        });
        const data = await res.json();
        if (res.ok) setPlaylists(data);
      } catch (err) {
        console.error("Lỗi khi lấy playlist:", err);
      }
    };

    fetchPlaylists();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá playlist này?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/playlist/${id}/delete`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        setPlaylists((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Xoá thất bại");
      }
    } catch (err) {
      console.error("Lỗi khi xoá playlist:", err);
    }
  };

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[25%] rounded flex flex-col justify-around">
        <div onClick={() => navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.home_icon} alt="" />
          <p className='font-bold'>Home</p>
        </div>
        <div onClick={() => navigate('/search')} className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.search_icon} alt="" />
          <p className='font-bold'>Search</p>
        </div>
      </div>

      <div className='bg-[#121212] h-[85%] rounded overflow-y-auto'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-8' src={assets.stack_icon} alt="" />
            <p className='font-semibold'>Your Library</p>
          </div>
          <div onClick={() => navigate('/admin')} className='flex items-center gap-3'>
            <img className='w-5' src={assets.arrow_icon} alt="" />
            <img className='w-5' src={assets.plus_icon} alt="" />
          </div>
        </div>

        {playlists.length > 0 ? (<>
          <div className="pl-6 pr-4 flex flex-col gap-3 text-sm">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex justify-between items-center p-3 text-lg border-b border-[#333] hover:bg-[#1a1a1a] rounded transition-all"
              >
                <span
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                  className="cursor-pointer hover:text-green-400 font-semibold"
                >
                  🎵 {playlist.name}
                </span>
                <FaTrash
                  onClick={() => handleDelete(playlist.id)}
                  className="text-red-400 hover:text-red-600 cursor-pointer ml-4 text-xl"
                />
              </div>
              
              

            ))}
          </div>
          <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
            <h1>Postcasts to follow</h1>
            <p className="font-light">we'll keep you update on new episodes</p>
            <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create playlist</button>
         </div>
         </>
        ) : (
          <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
            <h1>Create your first playlist</h1>
            <p className="font-light">It's easy. We'll help you.</p>
            <button onClick={() => navigate('/create-playlist')} className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
              Create playlist
            </button>
          </div>
          

          
        )}
      </div>
    </div>
  );
};

export default Sidebar;
