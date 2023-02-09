import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../component/Layout.js/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const movieTitle = localStorage.getItem("title");
    const movieData = await axios.delete(
      `http://localhost:8080/movie/${movieTitle}`
    );
    localStorage.removeItem("title");
    navigate("/");
  };

  const handleUpdate = async () => {
    console.log(location.state.movie);
    navigate("/moviedetails/edit", {
      state: {
        movieData: location.state.movie,
      },
    });
  };
  return (
    <>
      <Header />
      <div id="layout" className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div>
              <img
                id="image"
                src={location.state.movie.poster_api}
                alt="image not avaliable"
              />
            </div>
          </div>
          <div className="col-md-9">
            <h4>{location.state.movie.title}</h4>

            <h5>Movie Description : {location.state.movie.description}</h5>
            <h5>Movie Type : {location.state.movie.movie_type}</h5>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleUpdate()}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
