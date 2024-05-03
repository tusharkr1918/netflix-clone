import React, { useState, useEffect } from 'react'
import requests from './requests';
import axios from './axios';
import './Banner.css'


function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchDate() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ])
    }
    fetchDate();
  }, []);

  function truncate(str, n) {
    if (str?.length > n) {
      const lastSpaceIndex = str.lastIndexOf(' ', n);
      return lastSpaceIndex !== -1 ? `${str.substr(0, lastSpaceIndex)} ...` : `${str.substr(0, n - 1)}...`;
    } else {
      return str;
    }
  }

  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original/${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center"
      }}>

      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.orignal_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadebottom"/>
    </header>
  )
}

export default Banner