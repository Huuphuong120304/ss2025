// File: PlayerContext.jsx
import { createContext, useState, useRef, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState({ ...songsData[1], id: 1 });
    const [playStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setPlayerStatus(true);
            }).catch((err) => console.warn("Play error:", err));
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayerStatus(false);
        }
    };

    const playWithId = (id) => {
        setPlayerStatus(false);
        const selectedTrack = { ...songsData[id], id };
        setTrack(selectedTrack);

        // Gọi API backend để lưu lịch sử nghe
        fetch(`http://localhost:5000/api/song/${id}`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Đã lưu lịch sử nghe:", data);
        })
        .catch((err) => {
            console.warn("Lỗi gọi API lịch sử:", err);
        });
    };

    const previous = () => {
        if (track?.id > 0) {
            setTrack({ ...songsData[track.id - 1], id: track.id - 1 });
        }
    };

    const next = () => {
        if (track?.id < songsData.length - 1) {
            setTrack({ ...songsData[track.id + 1], id: track.id + 1 });
        }
    };

    const seekSong = (e) => {
        const offsetX = e.nativeEvent.offsetX;
        const totalWidth = seekBg.current.offsetWidth;
        const duration = audioRef.current.duration;

        if (duration) {
            audioRef.current.currentTime = (offsetX / totalWidth) * duration;
        }
    };

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
            if (audio) {
                audio.ontimeupdate = null;
            }
        };
    }, [track]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoaded = async () => {
            try {
                await audio.play();
                setPlayerStatus(true);
            } catch (err) {
                console.warn("Play error:", err);
            }
        };

        audio.addEventListener("loadedmetadata", handleLoaded);
        return () => {
            audio.removeEventListener("loadedmetadata", handleLoaded);
        };
    }, [track]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayerStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            <audio ref={audioRef} src={track.file} preload="metadata" />
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
