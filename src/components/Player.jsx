import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const {
    track, seekBar, seekBg, playStatus, play, pause, time,
    previous, next, seekSong,
    volume, setVolume,
    shuffle, setShuffle,
    repeat, setRepeat
  } = useContext(PlayerContext);

  if (!track) return null;

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      {/* Thông tin bài hát */}
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12 h-12 object-cover rounded' src={track.image} alt={track.name} />
        <div>
          <p className="font-semibold">{track.name}</p>
          <p className="text-sm text-gray-400 truncate">{track.desc.slice(0, 20)}</p>
        </div>
      </div>

      {/* Bộ điều khiển phát nhạc */}
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4 items-center'>
          {/* Nút Shuffle */}
          <img
            src={assets.shuffle_icon}
            alt="Shuffle"
            onClick={() => setShuffle(!shuffle)}
            className={`w-4 cursor-pointer transition-opacity ${shuffle ? 'opacity-100' : 'opacity-40'}`}
            title={shuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"}
          />

         
          <img
            onClick={previous}
            className='w-4 cursor-pointer'
            src={assets.pre_icon}
            alt="Previous"
            title="Bài trước"
          /> 
          

          {/* Nút Play/Pause */}
          {playStatus ? (
            <img
              onClick={pause}
              className='w-4 cursor-pointer'
              src={assets.pause_icon}
              alt="Pause"
              title="Tạm dừng"
            />
          ) : (
            <img
              onClick={play}
              className='w-4 cursor-pointer'
              src={assets.play_icon}
              alt="Play"
              title="Phát"
            />
          )}

         <img
            onClick={next}
            className='w-4 cursor-pointer'
            src={assets.next_icon}
            alt="Next"
            title="Bài tiếp theo"
          />

          {/* Nút Repeat */}
          <img
            src={assets.loop_icon}
            alt="Repeat"
            onClick={() => setRepeat(!repeat)}
            className={`w-4 cursor-pointer transition-opacity ${repeat ? 'opacity-100' : 'opacity-40'}`}
            title={repeat ? "Lặp lại bài hiện tại" : "Tắt lặp lại"}
          />
        </div>

        {/* Thanh tiến trình */}
        <div className='flex items-center gap-5 text-sm mt-1'>
          <p>{time.currentTime.minute}:{String(time.currentTime.second).padStart(2, '0')}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'
          >
            <hr
              ref={seekBar}
              className='h-1 border-none w-0 bg-green-600 rounded-full'
            />
          </div>
          <p>{time.totalTime.minute}:{String(time.totalTime.second).padStart(2, '0')}</p>
        </div>
      </div>

      {/* Điều khiển âm lượng và các icon khác */}
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.plays_icon} alt="Plays" />
        <img className='w-4' src={assets.mic_icon} alt="Mic" />
        <img className='w-4' src={assets.queue_icon} alt="Queue" />
        <img className='w-4' src={assets.speaker_icon} alt="Speaker" />
        <img className='w-4' src={assets.volume_icon} alt="Volume" />

        {/* Thanh điều chỉnh âm lượng */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 h-1 cursor-pointer"
          style={{ accentColor: '#4ade80' }}
          title="Điều chỉnh âm lượng"
        />

        <img className='w-4' src={assets.mini_player_icon} alt="Mini Player" />
        <img className='w-4' src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  );
};

export default Player;
