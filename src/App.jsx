import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const [photo, setPhoto] = useState(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const videoRef = useRef(null);

  const onMakePhoto = () => {
    const screenshot = videoRef.current.getScreenshot();
    setPhoto(screenshot);
  };

  const onLoadPhoto = (e) => {
    setSize({ width: e.target.naturalWidth, height: e.target.naturalHeight });
  };

  return (
    <section className="section">
      <Webcam
        ref={videoRef}
        audio={false}
        screenshotQuality={1}
        screenshotFormat="image/jpeg"
        forceScreenshotSourceSize={true}
        videoConstraints={{
          facingMode: "user",
          width: {
            min: 640,
            max: 2560,
          },
          height: {
            min: 480,
            max: 1440,
          },
        }}
      />
      <button onClick={onMakePhoto}>Photo</button>
      <img src={photo} onLoad={onLoadPhoto} alt="" />
      <p>
        Width: {size.width} <br />
        Height: {size.height}
      </p>
    </section>
  );
}

export default App;
