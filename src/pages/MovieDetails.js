import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../component/Layout.js/Header";
import Footer from "../component/Layout.js/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setHeader } from "./Utils";
import { message } from "antd";
import moment from "moment/moment";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const MovieDetails = () => {
  const currentdate = new Date().toISOString();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [movieShow, setMovieShow] = useState(null);

  const [moviedata, setMovieData] = useState(null);
  const { title } = useParams();
  console.log("movie title is " + title);
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

    const showDetails = await axios.get(`/show?title=${movieDetails.title}`);
    console.log(
      "show details from the movieDetails " + showDetails.data.successMessage
    );

    setMovieShow(showDetails.data.successMessage);
    console.log(
      "show details " + JSON.stringify(showDetails.data.successMessage)
    );
    setMovieData(movieDetails);
  };
  const onDeleteButton = async () => {
    // setHeader(localStorage.getItem("token"));
    try {
      await axios.delete(`/movie/${moviedata.title}`);
      console.log("deleted successfully ");
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/");
      // message.error(error.response.data.errorMessage);

      // if (error.response.status === 501) {
      //   message.error(error.response.data.errorMessage);
      // }
      // //localStorage.clear();
      // else {
      //   localStorage.removeItem("title");
      //   navigate("/");
      // }
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

  const handleEditShowDetails = (data) => {
    navigate("/editshow", {
      state: {
        movieDetails: data,
      },
    });
  };

  const handleDeleteShowDetails = async (data) => {
    console.log(data._id);
    const movieShowData = await axios.delete(`/show/${data._id}`);
    navigate(-1);
  };

  return (
    moviedata && (
      <>
        <Header />
        <body>
          <div id="layout" className="container mt-3">
            <div className="mb-3">
              <button
                className="btn btn-primary pointer-link"
                onClick={() => onBack()}
              >
                &#60;- Back
              </button>
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
                <div>
                  {role === "admin" && (
                    <div className="row mt-3">
                      <div className="col-md-3">
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
              </div>
              <div className="col-md-9">
                <h4>{moviedata.title}</h4>
                <span>
                  <span style={{ fontSize: "22px", fontWeight: "18px" }}>
                    <bold>About the Movie :</bold>{" "}
                  </span>
                  <span style={{ fontSize: "18px" }}>
                    {moviedata.description}
                  </span>
                </span>

                <div className="mt-4 mb-1">
                  <span
                    className="p-2 mr-2"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "lightgray",
                      borderRadius: "3px",
                    }}
                  >
                    {moviedata.format + " "}
                  </span>{" "}
                  <span
                    className="p-2"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "lightgray",
                      borderRadius: "3px",
                    }}
                  >
                    {moviedata.language + " "}
                  </span>
                </div>

                <div className="mt-3 mb-2">
                  <span className="mr-1" style={{ fontSize: "16px" }}>
                    {moviedata.hour}h {moviedata.minute}m{" "}
                  </span>
                  <span
                    className="mr-1"
                    style={{ paddingBottom: "1px", fontSize: "20px" }}
                  >
                    •
                  </span>{" "}
                  <span style={{ fontSize: "16px" }} className="mr-1">
                    {moviedata.movie_type}
                  </span>
                  <span
                    className="mr-1"
                    style={{ paddingBottom: "1px", fontSize: "20px" }}
                  >
                    •
                  </span>{" "}
                  <span style={{ fontSize: "16px" }}>
                    {moment(moviedata.date).format("ll")}
                  </span>
                </div>
                <div>
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
                <div className="mt-4">
                  <div className="w-50 mb-4">
                    {role === "admin" &&
                      (movieShow.length !== 0 ? (
                        <>
                          <span>
                            <h5>"Available shows"</h5>
                          </span>
                          <ul className="list-group">
                            {movieShow.map((data) => {
                              return (
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <span
                                    className={`mr-2 ${
                                      (data.seat.length * 100) / 126 > 80
                                        ? "btn-outline-danger"
                                        : "btn-outline-success"
                                    }`}
                                  >
                                    {moment(data.datetime).format("ll")} -{" "}
                                    {moment(data.datetime).format("LT")}
                                  </span>
                                  <span>
                                    <FiEdit2
                                      onClick={() =>
                                        handleEditShowDetails(data)
                                      }
                                    />
                                    <MdDelete
                                      onClick={() => {
                                        const confirmBox = window.confirm(
                                          "Do you Really want to delete this show?"
                                        );
                                        if (confirmBox === true) {
                                          handleDeleteShowDetails(data);
                                        }
                                      }}
                                    />
                                  </span>
                                </li>
                              );
                            })}{" "}
                          </ul>
                        </>
                      ) : (
                        <h6>"No Any Show Available"</h6>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
        <Footer />
      </>
    )
  );
};

export default MovieDetails;
