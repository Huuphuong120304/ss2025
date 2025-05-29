import React, {useEffect, useRef, useState} from 'react'
import { useNavigate, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import SpotifyLogin from './Login'
import { albumsData } from '../assets/assets'
import Navbar from './Navbar'
import Admin from '../pages/Admin'
import SearchPage from '../pages/SearchPage'
import CreatePlaylistForm from './CreatePlaylistForm'
import PlayList from '../pages/PlayList'
import { useBackground } from "../context/BackgroundContext";
import HistoryList from '../pages/HistoryList'
import RecommendList from '../pages/RecommendList'



const Display = () => {
    const displayRef = useRef();
    const location = useLocation();    
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.slice(-1) : "";
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const { bgColor } = useBackground();
    useEffect(() => {
      const handleMessage = (event) => {
        if (event.origin !== 'http://localhost:5000') return; 
        if (event.data.type === 'user') {
          setUser(event.data.payload);
          console.log(event.data.payload)
          navigate('/') 
        }
      };
      window.addEventListener('message', handleMessage);
    
      return () => window.removeEventListener('message', handleMessage);
    }, [navigate]);

    useEffect(() => {
      if (isAlbum && !isNaN(Number(albumId)) && albumsData[Number(albumId)]) {
        const bgColor = albumsData[Number(albumId)].bgColor;
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }, [location]);
    
    useEffect(() => {
      fetch('http://localhost:5000/api/user', {
        credentials: 'include' // <-- rất quan trọng
      })
        .then(res => res.json())
        .then(data => {
          if (data.email) {
            setUser(data)
          } else {
            navigate('/login')
          }
        });
    }, []);

    useEffect(() => {
      const isPlaylist = location.pathname.includes("playlist");

      if (isAlbum && !isNaN(Number(albumId)) && albumsData[Number(albumId)]) {
        // Album -> dùng màu từ albumsData
        const albumBg = albumsData[Number(albumId)].bgColor;
        displayRef.current.style.background = `linear-gradient(${albumBg}, #121212)`;
      } else if (isPlaylist && bgColor) {
        // Playlist -> dùng màu từ ảnh
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        // Các trang khác
        displayRef.current.style.background = `#121212`;
      }
    }, [location, bgColor]);

    

  return (
    
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Navbar user={user} />
        <Routes>
            <Route path='/' element={<DisplayHome/>}/>
            <Route path='/album/:id' element={<DisplayAlbum/>}></Route>
            <Route path='/login' element={<SpotifyLogin/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/search' element={<SearchPage/>}></Route>
            <Route path="/playlist/:playlistId" element={<PlayList />} />
            <Route path="/create-playlist" element={<CreatePlaylistForm />} />
            <Route path="/history" element={<HistoryList/>}/>
            <Route path="/re" element={<RecommendList/>}/>
        </Routes>
    </div>
  )
}

export default Display
