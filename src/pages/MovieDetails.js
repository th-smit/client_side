import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../component/Layout.js/Header";
import Footer from "../component/Layout.js/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setHeader } from "./Utils";

const MovieDetails = () => {
  const movieData = useLocation().state.movie;
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const language = movieData.language;
  const format = movieData.format;
  useEffect(() => {
    console.log(language);
    console.log(format);
    if (!localStorage.getItem("title")) {
      navigate("/");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (movieData == null) {
      navigate("/");
    }
  }, []);

  const onDeleteButton = async () => {
    setHeader(localStorage.getItem("token"));
    try {
      await axios.delete(`/movie/${movieData.title}`);
      localStorage.removeItem("title");
      navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const onEditButton = async () => {
    console.log(movieData);
    navigate("/edit", {
      state: {
        movieData: movieData,
      },
    });
  };

  const onBack = async () => {
    localStorage.removeItem("title");
    navigate("/");
  };

  const onBookShow = async () => {
    navigate("/bookshow", {
      state: {
        movieDetails: movieData,
      },
    });
  };
  const onAddShow = async () => {
    navigate("/addshow", {
      state: {
        movieDetails: movieData,
      },
    });
  };

  return (
    <>
      <Header />
      <body>
        <div id="layout" className="container mt-5">
          <div className="mb-3">
            <a className="pointer-link" onClick={() => onBack()}>
              &#60;- Back
            </a>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div>
                <img
                  id="image"
                  src={movieData.poster_api}
                  alt="image not avaliable"
                />
              </div>
            </div>
            <div className="col-md-9">
              <h4>{movieData.title}</h4>
              <h5>Movie Description : {movieData.description}</h5>
              <h5>Movie Type : {movieData.movie_type}</h5>

              <div>
                Language :
                {language.map((data) => {
                  return <>{" " + data}</>;
                })}
              </div>
              <div>
                Format :
                {format.map((data) => {
                  return <>{" " + data}</>;
                })}
              </div>
              <div>
                Movie Length : {movieData.hour}h {movieData.minute}m
              </div>
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={() => onBookShow()}
              >
                Book Show
              </button>
              {role == "admin" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onAddShow()}
                >
                  Add Show
                </button>
              )}
            </div>
          </div>
          {role === "admin" && (
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
          )}
        </div>
      </body>
      <Footer />
    </>
  );
};

export default MovieDetails;
