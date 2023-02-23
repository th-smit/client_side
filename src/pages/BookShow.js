import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Layout from "../component/Layout.js/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage, setHeader } from "./Utils";

const BookShow = () => {
  const movieShow = useLocation().state.movieDetails;
  const navigate = useNavigate();
  const [allMovieShow, setAllMovieShow] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getMovieShowRecords();
  }, []);

  const getMovieShowRecords = async () => {
    try {
      setHeader(localStorage.getItem("token"));
      const movieShowData = await axios.get(`/show?title=${movieShow.title}`);
      setAllMovieShow(movieShowData.data.successMessage);
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/login");
    }
  };

  const handleShowDetails = (data) => {
    console.log(data);
    navigate("/bookticket", {
      state: {
        movieData: data,
      },
    });
  };

  const onBack = async () => {
    navigate("/");
  };

  return (
    <>
      <Layout>
        <div className="container">
          <div>
            <h3>
              {movieShow.title} - {movieShow.language}
            </h3>
            <div>
              <p className="rounded-circle">{movieShow.movie_type}</p>
            </div>
            <div className="row">
              {allMovieShow.map((data) => {
                return (
                  <div key={data._id} className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => handleShowDetails(data)}
                    >
                      {data.time}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-2">
              <a className="pointer-link" onClick={() => onBack()}>
                &#60;- Back
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BookShow;
