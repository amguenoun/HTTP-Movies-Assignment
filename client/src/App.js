import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import UpdateForm from './Movies/UpdateForm';
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [listMovie, setListMovie] = useState([]);
  const [change, setChange] = useState(false)

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setListMovie(res.data))
      .catch(err => console.log(err.response));
  }, [change])

  const handleListUpdate = () => {
    setChange(!change);
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={() => <MovieList listMovie={listMovie} />} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} handleListUpdate={handleListUpdate} />;
        }}
      />
      <Route path='/update-movie/:id' render={(props) => <UpdateForm {...props} />} />
    </>
  );
};

export default App;
