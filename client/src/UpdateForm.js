import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function UpdateForm(props) {
    console.log('props', props)
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
  },[id]);

  const handleChange = (e) => {
    setFormState({ [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.put();
  };
  return null;
}

export default UpdateForm;
