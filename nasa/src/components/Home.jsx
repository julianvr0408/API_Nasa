import React, { useState } from 'react';
import './Home.css';

const apikey = 'mbIYr5euwIPzeOCVCLNk3eNk0V2WbqvAKk60ReLE';
const url = 'https://api.nasa.gov/planetary/apod?';

const Home = () => {
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [imageDate, setImageDate] = useState('');
  const [error, setError] = useState('');

  const fetchImage = async () => {
    setError('');
    setImageUrl('');
    setTitle('');
    setExplanation('');
    setImageDate('');
    if (!date) {
      setError('Por favor digita una fecha correcta');
      return;
    }
    try {
      const response = await fetch(`${url}date=${date}&api_key=${apikey}`);
      if (!response.ok) {
        setError('Por favor digita una fecha correcta');
        return;
      }
      const data = await response.json();
      setImageUrl(data.url || data.hdurl);
      setTitle(data.title || '');
      setExplanation(data.explanation || '');
      setImageDate(data.date || '');
    } catch (err) {
      setError('Error al obtener la imagen');
    }
  };

  return (
    <div className="contenedor">
      <div className="detalles-contenedor">
        <div className="input-detalles">
          <span>Date: </span>
          <input
            type="text"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
        <button onClick={fetchImage}>Buscar Imagen</button>
      </div>
      <div className="contenedor-imagen">
        {error && <p className="error-text">{error}</p>}
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt="NASA"
              className="nasa-img"
            />
            <h2 className="nasa-title">{title}</h2>
            <p className="nasa-description">{explanation}</p>
            <p className="nasa-date">{imageDate}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;