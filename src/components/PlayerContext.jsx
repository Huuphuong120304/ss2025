import { createContext, useState, useRef } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext ();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const[playStatus,setPlayerStatus] = useState(false);
    const [time,setTime] = useState({
        currentTime :{
            second: 0,
            minute: 0

        },

        totalTime:{
            second: 0,
            minute: 0
        }
    })
    const play = () =>{
        audioRef.current.play();
        setPlayerStatus(true)
    }
    const pause = () => {
        audioRef.current.pause();
        setPlayerStatus(flase);
    }
     const contextValue = {
    audioRef,
    seekBar ,
    seekBg ,
    track ,
    setTrack ,
    playStatus ,setPlayerStatus,
    time, setTime
     }

     return (
        <PlayerContext.Provider value = {contextValue}>
            {props.children}
            </PlayerContext.Provider>

     )
}
export default PlayerContextProvider;