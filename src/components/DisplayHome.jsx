import React, { useEffect, useState } from 'react';
import AlbumItem from './AlbumItem';
import SongList from './SongList';
import RecommendList from '../pages/RecommendList';
import HistoryList from '../pages/HistoryList';
import LatestSongsList from '../pages/LatestSongsList'

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/albums", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setLoadingAlbums(false);
      })
      .catch(err => {
        setError("Không thể tải album.");
        setLoadingAlbums(false);
      });
  }, []);

  return (
    <>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        {loadingAlbums ? (
          <p className="text-gray-400">Đang tải album...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className='flex overflow-auto'>
            {albums.map((item) => (
              <AlbumItem
                key={item.id}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Recommended for you</h1>
        <RecommendList />
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>New songs</h1>
        <LatestSongsList />
      </div>


      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's</h1>
        <SongList />
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Recently played songs</h1>
        <HistoryList />
      </div>
    </>
  );
};

export default DisplayHome;
