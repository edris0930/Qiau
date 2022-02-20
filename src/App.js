import React, { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import downloadIcon from "./download.png";
import {setRTLTextPlugin} from "react-map-gl";
import { toast } from "react-toastify";
import ReactMapGL, { Marker } from "react-map-gl";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 31.322,
    longitude: 51.036666,
    width: "100%",
    height: "100vh",
    zoom: 5,
    transitionDuration: 2000,
  });

  const getLoc = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCoord, handler);
      function setCoord(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        viewport.latitude = position.coords.latitude;
        viewport.longitude = position.coords.longitude;
        viewport.zoom = 14;
        setLoading(false);
      }
    }
    function handler(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toast.error(
            "برای استفاده از نقشه نیاز به دسترسی موقعیت مکانی میباشد.",
            {
              position: toast.POSITION.BOTTOM_LEFT,
            }
          );
          break;
        case error.POSITION_UNAVAILABLE:
          toast.error("موقعیت جغرافیایی ناشناس میباشد.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          break;
        case error.TIMEOUT:
          toast.error("لطفا از برنامه خارج شوید و دوباره امتحان کنید.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          break;
        case error.UNKNOWN_ERROR:
          toast.error("یک خطای ناشناس رخ داده !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          break;
      }
    }
  };

  useEffect(() => {
    getLoc();
    setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    );
  }, []);

  return (
    <div className="App" style={{ position: "relative" }}>
      {loading === false && (
        <>
        <button
        style={{
          position: "fixed",
          left: "20px",
          top: "20px",
          background: "royalblue",
          color: "white",
          border: "none",
          height: "50px",
          width: "150px",
          fontSize:"16px",
          borderRadius:"10px",
          cursor:"pointer",
          zIndex:"99999999999999999999"
        }}
        onClick={() => {
          getLoc();
          setShow(true);
        }}
      >
        یافتن موقعیت شما
      </button>
      <button
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          background: "orange",
          color: "white",
          border: "none",
          height: "50px",
          width: "200px",
          fontSize:"13px",
          borderRadius:"10px",
          cursor:"pointer",
          zIndex:"99999999999999999999"
        }}
      >
        توسعه داده شده توسط رضا کلهر
      </button>
        <ReactMapGL
          mapboxApiAccessToken="pk.eyJ1IjoibW9oYW1tYWQtdmFhIiwiYSI6ImNrenU4MDd4azE5Mjgyd285cnE0a29yazIifQ.PLx-ABdgHzgbJpMCJlC4gw"
          {...viewport}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {show === true && (
            <Marker
              latitude={parseFloat(viewport.latitude)}
              longitude={parseFloat(viewport.longitude)}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <img
                style={{ width: "25px", marginTop: "-15px" }}
                src={downloadIcon}
                alt="marker"
              />
            </Marker>
          )}
        </ReactMapGL>
        </>
      )}
    </div>
  );
};

export default App;

// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyCy-zWMmKuIwUHqG3lAjVf5kkr5LtYhS8I")
// })(App)
