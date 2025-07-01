import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa6";
import { BsFillPauseFill } from "react-icons/bs";
import footballVideo from "../asset/video/water.mp4";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

function VideoSec(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, setPlay] = useState(true);
  const [cmsImage, setCmsImage] = useState({});

  const videoRef = useRef(null);
  //   const VideoSrc =
  //     "https://player.vimeo.com/progressive_redirect/playback/682048671/rendition/360p?loc=external&oauth2_token_id=57447761&signature=5be12c7ba41b540b1bb6e8ff3cb8f859e9381ece088946bb8257fe3da7201f79";

  // const fetchCMSImages = async () => {
  //   try {
  //     const { status, loading, error, result } = await getCmsImage();
  //     console.log("fetchCMSImages", result);
  //     if (status == true) {
  //       setCmsImage(result);
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  const VideoSrc = footballVideo;

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      // console.log("vde pas");
      setPlay(false);
      setTimeout(() => {
        document.getElementById("play_pause_btn").style.opacity = 0;
      }, 1000);
      videoRef.current.play();
      setIsPlaying(true);
      console.log("if called");
    } else {
      // console.log("vde play")
      setPlay(true);
      document.getElementById("play_pause_btn").style.opacity = 1;
      videoRef.current.pause();
      setIsPlaying(false);
      console.log("if else called");
    }
  };

  console.log("play", play);
  return (
    <div className="position-relative videsec_rela">
    
      <video
        ref={videoRef}
        src={props?.videos}
        controls={play ? false : true}
        width="100%"
        className={`${!isPlaying ? "video_opc" : ""}`}
      />
      <div className="position-absolute video-bg-btn">
        {/* {play ? (
          <> */}
        <button onClick={togglePlayPause} id="play_pause_btn">
          {isPlaying ? (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <FaPause className="play_pause_icon" size={23} />
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <FaPlay className="play_pause_icon" size={23} />
              </div>
            </>
          )}
        </button>
        {/* </>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
}
export default VideoSec;
