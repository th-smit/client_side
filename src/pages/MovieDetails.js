import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../component/Layout.js/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [moviedetails, setMovieDetails] = useState();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (location.state === null) {
      navigate("/");
    }
    // if (!localStorage.getItem("title")) {
    //   navigate("/");
    // }
  }, []);

  const onDeleteButton = async () => {
    const movieTitle = location.state.movie.title;
    await axios.delete(`http://localhost:8080/movie/${movieTitle}`);
    localStorage.removeItem("title");
    navigate("/");
  };

  const onEditButton = async () => {
    console.log(location.state.movie);
    navigate("/edit", {
      state: {
        movieData: location.state.movie,
      },
    });
  };

  const onBack = async () => {
    localStorage.removeItem("title");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div id="layout" className="container mt-5">
        <div className="mb-3">
          <a className="pointer-link" onClick={() => onBack()}>
            Back
          </a>
        </div>
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
        <div className="row mt-3">
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onEditButton()}
            >
              Edit
            </button>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const confirmBox = window.confirm(
                  "Do you Really want to delete this movie?"
                );
                if (confirmBox === true) {
                  onDeleteButton();
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
