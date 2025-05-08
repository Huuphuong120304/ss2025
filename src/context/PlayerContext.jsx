import { createContext, useState, useRef, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[1]);
    const [playStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    const play = () => {
        audioRef.current.play();
        setPlayerStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayerStatus(false);
    };

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayerStatus(true);
    };

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await setTimeout(() => {
                audioRef.current.play();
                setPlayerStatus(true);
            }, 100);
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await setTimeout(() => {
                audioRef.current.play();
                setPlayerStatus(true);
            }, 100);
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
    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate=()=>{
                seekBar.current.style.width = Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            }
        })
    })

    // useEffect(() => {
    //     const updateTime = () => {
    //         if (audioRef.current && audioRef.current.duration) {
    //             const currentTime = audioRef.current.currentTime;
    //             const duration = audioRef.current.duration;

    //             seekBar.current.style.width =
    //                 Math.floor((currentTime / duration) * 100) + "%";

    //             setTime({
    //                 currentTime: {
    //                     second: Math.floor(currentTime % 60),
    //                     minute: Math.floor(currentTime / 60),
    //                 },
    //                 totalTime: {
    //                     second: Math.floor(duration % 60),
    //                     minute: Math.floor(duration / 60),
    //                 },
    //             });
    //         }
    //     };

    //     const audio = audioRef.current;
    //     if (audio) {
    //         audio.ontimeupdate = updateTime;
    //     }

    //     return () => {
    //         if (audio) {
    //             audio.ontimeupdate = null;
    //         }
    //     };
    // }, [track]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setPlayerStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous, next,
        seekSong,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            <audio ref={audioRef} src={track.url} preload="metadata" />
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
