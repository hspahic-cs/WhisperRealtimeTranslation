import "./Home.css";
import logo from "./Logo.png";
import upload from "./Upload.png";
import React, { useState } from "react";
import CountUp, { useCountUp } from "react-countup";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import axios from "axios";

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [translatedAudio, setTranslatedAudio] = useState("");

  const blobToFile = async (blobUrl) => {
    const audioBlob = await fetch(blobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
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
              <span ref={countUpRef} />
              <ReactMediaRecorder
                audio
                render={({
                  status,
                  startRecording,
                  stopRecording,
                  mediaBlobUrl,
                }) => (
                  <div>
                    <p>{status}</p>
                    {!isRecording ? (
                      <div>
                        <button
                          className="record-button"
                          onClick={() => {
                            startRecording();
                            setIsRecording(true);
                            start();
                          }}
                        >
                          Record
                        </button>
                      </div>
                    ) : (
                      <div id="stop-main-circle">
                        <button
                          id="stop-inner-circle"
                          onClick={() => {
                            stopRecording();
                            setIsRecording(false);
                            setHasAudio(true);
                            reset();
                          }}
                        >
                          STOP
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
              {translatedAudio ? <p>{translatedAudio}</p> : <p></p>}
            </div>
          )}
        </CountUp>
      </div>
    </div>
  );
};

export default Home;
