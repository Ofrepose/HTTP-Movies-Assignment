import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, Route, useParams} from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieEditForm from "./MovieEditForm";
import DeleteMovie from "./DeleteMovie";

function Movie({ addToSavedList }) {

  const [movie, setMovie] = useState(null);
  const params = useParams();

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
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link key={movie.id} to={`/update-movie/${movie.id}`} >
        Edit
      </Link>
        <Link to={`/deleter/${movie.id}`} movie = {movie.id}>

        Delete

        </Link>

    </div>
  );
}

export default Movie;
