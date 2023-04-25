import "./Home.css";
import logo from "./Logo.png";
import upload from "./Upload.png";
import React, { useState, useEffect } from "react";
import CountUp, { useCountUp } from "react-countup";
import { useSpeechSynthesis } from 'react-speech-kit';
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import axios from "axios";

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [translatedAudio, setTranslatedAudio] = useState("");

  const { speak } = useSpeechSynthesis()
  const text = 'Some dummy text'

  const blobToFile = async (blobUrl) => {
    const audioBlob = await fetch(blobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/translations",
      formData,
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_OPEN_API_KEY,
          "Content-Type": "multipart/form-data",

        },
      }
    );
    setTranslatedAudio(response.data.text);
  };
  
  
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const translatedText="";

  function toggle() {
    setIsActive(!isActive);
  }

  function speakText(){
    const translatedText= translatedAudio
    console.log(translatedText)
    speak({text: translatedText})
  }

  function resetTime() {
    setSeconds(0);
    setIsActive(false);
  }


  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


  return (
    <div className="overall">
      <div className="left">
        <img className="logo" src={logo} alt="logo"></img>
      </div>
      <div className="right">
        <div className="title">Translate any language to english</div>
        <div className="subtitle">
          Record, click translate, then see your audio file translated to
          English
        </div>

        <div>
          <img className="upload" src={upload} alt="upload"></img>
        </div>

        <CountUp start={0} end={100}>
          {({ countUpRef, start, reset }) => (
            <div>
              <span className="countUp" ref={countUpRef} />
              <ReactMediaRecorder
                audio
                render={({
                  status,
                  startRecording,
                  stopRecording,
                  mediaBlobUrl,
                }) => (
                  <div>
                    <p className="status">{status}</p>
                    {!isRecording ? (
                      <div>
                        <button
                          className="record-button"
                          onClick={() => {
                            startRecording();
                            setIsRecording(true);
                            start();
                            toggle();
                          }}
                        >
                          Record
                        </button>
                      </div>
                    ) : (
                      <div id="stop-main-circle">
                        <div className="time">
                          {seconds}s
                        </div>
                        <button
                          id="stop-inner-circle"
                          onClick={() => {
                            stopRecording();
                            setIsRecording(false);
                            setHasAudio(true);
                            reset();
                            resetTime();
                          }}
                        >
                          Stop
                        </button>
                      </div>
                    )}
                    <audio src={mediaBlobUrl}></audio>
                    <div>
                      <button
                        className="translate-button"
                        disabled={!hasAudio}
                        onClick={async () => {
                          await blobToFile(mediaBlobUrl);
                          
                        }}
                      >
                        Translate
                      </button>
                    </div>
                  </div>
                )}
              />
              <div className="responsetext">
                {translatedAudio ?
                 <div className="translatedTexts"><p className="textTra" >{translatedAudio} </p><button className="speakButt" onClick={() => speakText()} >speak</button> </div> : <p className="translatedTexts"></p>}
              </div>
              
            </div>
          )}
        </CountUp>
      </div>
    </div>
  );
};

export default Home;
