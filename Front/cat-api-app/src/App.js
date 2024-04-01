import React, { useState } from 'react';
import './App.css';
import { getImages, getImagesLimit } from './api';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { useEffect  } from 'react';
import { gapi } from 'gapi-script';

const clientId = "382864808627-8h8tlqpuv0tv5829jsdghsmcldu4qshp.apps.googleusercontent.com";

function App() {

  useEffect (() => {

    function start() {
      gapi.client.init({
        clientId:clientId,
        scope: ""
      })
    };

    gapi.load ('client:auth2', start);
  });
  
  const [images, setImages] = useState([]);

  const handleViewOneImage = async () => {
    const data = await getImages();
    setImages(data);
  };

  const handleViewTenImages = async () => {
    const data = await getImagesLimit(10);
    setImages(data);
  };

  return (
    
    <div className="App">
      <LoginButton/>
      <LogoutButton/>
      <h1>Ver Imágenes</h1>
      <button onClick={handleViewOneImage}>Ver 1 Imagen</button>
      <button onClick={handleViewTenImages}>Ver 10 Imágenes</button>
      <div className="ImageContainer">
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default App;

