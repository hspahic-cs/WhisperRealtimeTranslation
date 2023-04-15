import "./Home.css";
import logo from "./Logo.png";
import upload from "./Upload.png";

const Home = () => {
  return (
    <div class="overall">
      <div class="left">
        <img className="logo" src={logo} alt="logo"></img>
      </div>
      <div class="right">
        <div class="title">Translate any language to english</div>
        <div class="subtitle">
          Upload an Audio File below, click translate, then click play to hear
          your audio file translated to english
        </div>

        <div>
          <img className="upload" src={upload} alt="upload"></img>
        </div>
        <div>
          <button class="translatebutton">Translate</button>
        </div>
        <div>
          <button class="playbutton">Play</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
