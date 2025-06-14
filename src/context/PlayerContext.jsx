import { createContext, useState, useRef, useEffect } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [playStatus, setPlayerStatus] = useState(false);
  const [volume, setVolume] = useState(1);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Play song by ID (optional: newQueue)
  const playWithId = async (id, newQueue = null) => {
    let songList = newQueue ?? queue;
    if (newQueue) setQueue(newQueue);

    const indexToPlay = songList.findIndex((s) => s.id === id);
    if (indexToPlay !== -1) setCurrentIndex(indexToPlay);

    if (track?.id === id) {
      if (userInteracted && audioRef.current?.paused) {
        audioRef.current.play().then(() => setPlayerStatus(true));
      }
      return;
    }

    setPlayerStatus(false);
    try {
      const res = await fetch(`http://localhost:5000/api/song/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.file) {
        setTrack(data);
        setTimeout(() => {
          if (userInteracted && audioRef.current) {
            audioRef.current.play().then(() => setPlayerStatus(true));
          }
        }, 100);
      }
    } catch (err) {
      console.warn("Lỗi lấy bài hát:", err);
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlayerStatus(true))
        .catch((err) => console.warn("Play error:", err));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayerStatus(false);
    }
  };

  const next = () => {
    if (queue.length === 0) return;

    let nextIndex;
    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * queue.length);
      } while (nextIndex === currentIndex && queue.length > 1);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) nextIndex = 0;
    }

    const nextSong = queue[nextIndex];
    if (nextSong) {
      setCurrentIndex(nextIndex); // ✅ cập nhật chỉ mục
      playWithId(nextSong.id);
    }
  };

  const previous = () => {
    if (queue.length === 0) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = queue.length - 1;

    const prevSong = queue[prevIndex];
    if (prevSong) {
      setCurrentIndex(prevIndex); // ✅ cập nhật chỉ mục
      playWithId(prevSong.id);
    }
  };

  const seekSong = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const totalWidth = seekBg.current?.offsetWidth || 1;
    const duration = audioRef.current?.duration || 0;

    if (duration) {
      audioRef.current.currentTime = (offsetX / totalWidth) * duration;
    }
  };

  // Bắt đầu phát khi user tương tác để tránh autoplay block
  useEffect(() => {
    const handleUserInteract = () => {
      setUserInteracted(true);
      window.removeEventListener("click", handleUserInteract);
    };
    window.addEventListener("click", handleUserInteract);
    return () => window.removeEventListener("click", handleUserInteract);
  }, []);

  // Cập nhật volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cập nhật tiến trình
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      if (!audio.duration || isNaN(audio.duration)) return;

      const percent = (audio.currentTime / audio.duration) * 100;
      if (seekBar.current) {
        seekBar.current.style.width = `${Math.floor(percent)}%`;
      }

      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60),
        },
      });
    };

    audio.ontimeupdate = update;
    return () => {
      audio.ontimeupdate = null;
    };
  }, [track]);

  // Tự động play khi loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = async () => {
      try {
        if (userInteracted) {
          await audio.play();
          setPlayerStatus(true);
        }
      } catch (err) {
        console.warn("Play error:", err);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [track, userInteracted]);

  // Xử lý khi bài hát kết thúc
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeat && track) {
        audio.currentTime = 0;
        audio.play();
      } else {
        next();
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [track, repeat, currentIndex, queue, shuffle]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track, setTrack,
    playStatus, setPlayerStatus,
    time, setTime,
    play, pause,
    playWithId,
    seekSong,
    volume, setVolume,
    queue, setQueue,
    currentIndex, setCurrentIndex,
    next, previous,
    shuffle, setShuffle,
    repeat, setRepeat,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      {track && (
        <audio
          key={track.id}
          ref={audioRef}
          src={track.file}
          preload="metadata"
        />
      )}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
