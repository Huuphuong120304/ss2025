import home_icon from './home.png'
import bell_icon from './bell.png'
import clock_icon from './clock.png'
import arrow_icon from './right-arrow.png'
import search_icon from './search.png'
import stack_icon from './stack.png'
import plus_icon from './plus.png'
import pre_icon from './pre.png'
import shuffle_icon from './shuffle.png'
import loop_icon from './loop.png'
import next_icon from './next.png'
import play_icon from './play-pause.png'
import queue_icon from './queue.png'
import mic_icon from './mic.png'
import mini_player_icon from './mini_player.jpg'
import speaker_icon from './speaker.png'
import plays_icon from './plays.png'
import zoom_icon from './zoom.png'
import volume_icon from './volume.png'
import arrow_left from './arrow-left.png'
import arrow_right from './arrow-right.png'
import melodify_logo from './logo.png'

import img1 from './img4.jpg';
import img2 from './img5.jpg';
// import img3 from './img6.jpg';
// import img4 from './img4.jpg';
// import img5 from './img5.jpg';
// import img6 from './img6.jpg';
// import img7 from './img7.jpg';
// import img8 from './img8.jpg';
// import img9 from './img9.jpg';
// import img10 from './img10.jpg';
// import img11 from './img11.jpg';
// import img12 from './img12.jpg';
// // import img13 from './img13.jpg'; // Dòng này bị comment
// import img14 from './img14.jpg';
// import img15 from './img15.jpg';
// import img16 from './img16.jpg';

// import song1 from './song1.mp3';
// import song2 from './song2.mp3';
// import song3 from './song3.mp3';


export const assets={
    home_icon,bell_icon,clock_icon,arrow_icon,search_icon,stack_icon,plus_icon, play_icon, pre_icon, shuffle_icon, next_icon, loop_icon, plays_icon, mic_icon, queue_icon,
     speaker_icon, volume_icon, mini_player_icon, zoom_icon, arrow_left, arrow_right, melodify_logo
}
export const albumsData = [
    {
      id: 0,
      name: "Top 50 Global",
      image: img2,
      desc: "Your weekly update of the most played tracks",
      bgColor: "#2a4365"
    },
    {
      id: 1,
      name: "Top 50 India",
      image: img1,
      desc: "Your weekly update of the most played tracks",
      bgColor: "#22543d"
    },
    {
      id: 2,
      name: "Trending India",
      image: img1,
      desc: "Your weekly update of the most played tracks",
      bgColor: "#742a2a"
    },
    {
        id: 3,
        name: "Trending Global",
        image: img1,
        desc: "Your weekly update of the most played tracks",
        bgColor: "#44337a"
      },
      {
        id: 4,
        name: "Mega Hits",
        image: img1,
        desc: "Your weekly update of the most played tracks",
        bgColor: "#234e52"
      },
      {
        id: 5,
        name: "Hapy favorites",
        image: img2,
        desc: "Your weekly update of the most played tracks",
        bgColor: "#744210"
      }
  ];
  

export const songsData=[
    {
        id: 0,
        name: "Song One",
        image: img1,
        // file: song1,
        desc: "Put a smile on your face with these happy tunes",
        duration: "3:00"
      },
      {
        id: 1,
        name: "Song Two",
        image: img2,
        // file: song2,
        desc: "Put a smile on your face with these happy tunes",
        duration: "2:20"
      },
      {
        id: 2,
        name: "Song Three",
        image: img1,
        // file: song1,
        desc: "Put a smile on your face with these happy tunes",
        duration: "3:00"
      },
      {
        id: 3,
        name: "Song Four",
        image: img2,
        // file: song2,
        desc: "Put a smile on your face with these happy tunes",
        duration: "2:20"
      },
       {
        id: 4,
        name: "Song Five",
        image: img1,
        // file: song1,
        desc: "Put a smile on your face with these happy tunes",
        duration: "3:00"
      },
      {
        id: 5,
        name: "Song Six",
        image: img1,
        // file: song1,
        desc: "Put a smile on your face with these happy tunes",
        duration: "3:00"
      }
     
]