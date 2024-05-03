import axios from './axios';
import React, { useEffect, useState } from 'react';
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);

  const [trailerId, setTrailerId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        let videoId = urlParams.get('v');
        videoId === trailerId ? setTrailerId("") : setTrailerId(videoId);
      })
      .catch((error) => console.log(error))
  }

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  }

  return (
    <div id='row'>
      <h2> {title} </h2>
      <div className="row__posters">
        {
          movies.map((movie) =>
            <img
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              key={movie.id}
              src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => handleClick(movie)}
            />
          )
        }
      </div>
      <div className={trailerId ? 'showTrailer': 'hideTrailer'}>
        {trailerId && <YouTube videoId={trailerId} opts={opts}></YouTube>}
      </div>
    </div>
  );
}

export default Row;



