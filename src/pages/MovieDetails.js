import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../component/Layout.js/Header";
import Footer from "../component/Layout.js/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setHeader } from "./Utils";

const MovieDetails = () => {
  const currentdate = new Date().toISOString();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [moviedata, setMovieData] = useState(null);
  var { title } = useParams();
  useEffect(() => {
    getMovieRecord();

    // if (!localStorage.getItem("title")) {
    //   navigate("/");
    // }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const getMovieRecord = async () => {
    const movieDetails = await (
      await axios.get(`/movie?title=${title}`)
    ).data.successMessage[0];
    console.log(movieDetails);
    setMovieData(movieDetails);
  };
  const onDeleteButton = async () => {
    setHeader(localStorage.getItem("token"));
    try {
      await axios.delete(`/movie/${moviedata.title}`);
      localStorage.removeItem("title");
      navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const onEditButton = async () => {
    navigate(`/edit/${moviedata.title}`);
  };

  const onBack = async () => {
    localStorage.removeItem("title");
    navigate("/");
  };

  const onBookShow = async () => {
    console.log(moviedata._id);
    navigate(`/bookshow/${moviedata.title}/${currentdate}`);
  };
  const onAddShow = async () => {
    navigate(`/addshow/${moviedata.title}`);
  };

  return (
    moviedata && (
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
                    src={moviedata.poster_api}
                    alt="image not avaliable"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <h4>{moviedata.title}</h4>
                <h5>Movie Description : {moviedata.description}</h5>
                <h5>Movie Type : {moviedata.movie_type}</h5>

                <div>
                  Language :
                  {moviedata.language.map((data) => {
                    return <span key={data}>{" " + data}</span>;
                  })}
                </div>
                <div>
                  Format :
                  {moviedata.format.map((data) => {
                    return <span key={data}>{" " + data}</span>;
                  })}
                </div>
                <div>
                  Movie Length : {moviedata.hour}h {moviedata.minute}m
                </div>
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={() => onBookShow()}
                >
                  Book Show
                </button>
                {role === "admin" && (
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
    )
  );
};

export default MovieDetails;
