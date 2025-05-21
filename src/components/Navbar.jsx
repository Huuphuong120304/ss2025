import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'GET',
        credentials: 'include',
      });
      window.location.reload(); // hoặc setUser(null) nếu truyền hàm qua props
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        {/* Nút điều hướng */}
        <div className='flex items-center gap-2'>
          <img
            onClick={() => navigate(-1)}
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
            src={assets.arrow_left}
            alt="Back"
          />
          <img
            onClick={() => navigate(1)}
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
            src={assets.arrow_right}
            alt="Forward"
          />
        </div>

        {/* Hiển thị user hoặc nút đăng nhập */}
        <div className='flex items-center gap-4'>
          {user ? (
            <>              
              <p
                onClick={handleLogout}
                className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer hidden md:block'
              >
                Log out
              </p>
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-white"
                title={user.name}
              />
            </>
          ) : (
         <div className="flex items-center gap-3">
            {/* Nút Signup */}
            <p
              onClick={() => navigate('/login')}
              className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer"
            >
              Signup
            </p>

            {/* Nút Avatar (icon người) */}
            <p              
              className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow"
              title="Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5v1.5h18V18c0-3-6-4.5-9-4.5z" />
              </svg>
            </p>
          </div>

            
          )}
        </div>
      </div>

      {/* Bộ lọc thể loại */}
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        {/* <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p> */}
      </div>
    </>
  );
};

export default Navbar;
