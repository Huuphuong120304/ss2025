import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./components/SideBar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import { BackgroundProvider } from "./context/BackgroundContext";


const App = () => {

  const {audioRef,track}=useContext(PlayerContext);  
  return (
    <div className="h-screen bg-black">     
      <div className="h-[90%] flex">
            <Sidebar />            
            <BackgroundProvider>
              <Display />
            </BackgroundProvider>
          </div>
          <Player />
          {/* { playStatus&& <ReactAudioPlayer  src={track.file}  autoPlay  controls/>  } */}
          {track && track.file ? (<audio ref={audioRef} src={track.file} preload="metadata" />) : null}


                 
    </div>
  )
}
export default App;
