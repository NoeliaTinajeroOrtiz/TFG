import React, { useState, useEffect } from 'react';
import './App.css';
import { getImages, getImagesLimit } from './api';
import LoginButton from './components/login';
import LogoutButton from './components/logout';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [images, setImages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      }).then(() => {
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        setIsLoggedIn(isSignedIn);
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleViewOneImage = async () => {
    if (isLoggedIn) {
      const data = await getImages();
      setImages(data);
    }
  };

  const handleViewTenImages = async () => {
    if (isLoggedIn) {
      const data = await getImagesLimit(10);
      setImages(data);
    }
  };

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsLoggedIn(true);
    });
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <div className="App">
      <LoginButton onClick={handleLogin} />
      <LogoutButton onClick={handleLogout} />
      <h1>Ver Imágenes</h1>
      <button onClick={handleViewOneImage} disabled={!isLoggedIn}>Ver 1 Imagen</button>
      <button onClick={handleViewTenImages} disabled={!isLoggedIn}>Ver 10 Imágenes</button>
      <div className="ImageContainer">
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default App;





