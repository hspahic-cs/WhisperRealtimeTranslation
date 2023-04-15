import "./Home.css";
import logo from "./Logo.png";
import upload from "./Upload.png";
import React, { useState } from "react";
import CountUp, { useCountUp } from "react-countup";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  return (
    <div className="overall">
      <div className="left">
        <img className="logo" src={logo} alt="logo"></img>
      </div>
      <div className="right">
        <div className="title">Translate any language to english</div>
        {/* <div className="subtitle">
          Upload an Audio File below, click translate, then click play to hear
          your audio file translated to english
        </div> */}

        {/* <div>
          <img className="upload" src={upload} alt="upload"></img>
        </div> */}

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
                  </div>
                )}
              />
            </div>
          )}
        </CountUp>

        <div>
          <button className="translate-button" disabled={!hasAudio}>
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
