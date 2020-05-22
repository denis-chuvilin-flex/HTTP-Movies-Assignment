import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

//import components
import MovieCard from './MovieCard';

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((id) => {
        console.log('deleted Id', id);
        getMovieList();
        push('/')
      })
      .catch((err) => console.log(err));
  };
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => push(`/update-movie/${id}`)}> Update Movie</button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;
