import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';

function UpdateForm(props) {
  //   console.log('props', props);
  const [formState, setFormState] = useState({
    id: '',
    title: '',
    director: '',
    metaScore: '',
    stars: [],
  });

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setFormState(res.data))
      .catch((err) => {
        console.log({ Error: err.message });
      });
  }, [id]);

  const handleChange = (e) => {
    console.log(formState);

    setFormState({
      ...formState,
      [e.target.name]: e.target.name === 'stars' ? e.target.value.split(',') : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formState)
      .then((res) => {
        console.log({ resData: res.data });
        props.setMovieList([...props.movieList, formState]);
        props.getMovieList();
        console.log('MovieList', props.movieList);
        push(`/movies/${id}`);
      })
      .catch((err) => console.log({ Error: err.message }));
  };
  return (
    <div className="update-form">
      <form onSubmit={handleSubmit}>
        <label>
          Title <input name="title" onChange={handleChange} value={formState.title} />
        </label>
        <br />
        <label>
          Director <input name="director" onChange={handleChange} value={formState.director} />
        </label>
        <br />
        <label>
          MetaScore <input name="metascore" onChange={handleChange} value={formState.metascore} />
        </label>
        <br />
        <label>
          Stars <input name="stars" onChange={handleChange} value={formState.stars} />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;
