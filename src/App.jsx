import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const [cameraOn, setCameraOn] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [resolution, setResolution] = useState(null);
  const videoRef = useRef(null);

  const onMakePhoto = () => {
    if (videoRef.current) setPhoto(videoRef.current.getScreenshot());
  };

  const onLoadPhoto = (e) => {
    setResolution({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };

  return (
    <section className="section">
      {cameraOn && (
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
              ideal: 2560,
            },
            height: {
              min: 480,
              max: 1440,
              ideal: 1440,
            },
          }}
        />
      )}

      <button className="on-off-button" onClick={() => setCameraOn(!cameraOn)}>
        On /Off
      </button>

      <button className="photo-button" onClick={onMakePhoto}>
        Photo
      </button>

      <img src={photo} alt="" className="photo" onLoad={onLoadPhoto} />

      {resolution && (
        <span className="resolution">
          Width: {resolution.width}
          <br />
          Height: {resolution.height}
        </span>
      )}
    </section>
  );
}

export default App;
