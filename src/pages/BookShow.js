import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";
import { clearStorage, setHeader } from "./Utils";
import moment from "moment/moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BookShow = () => {
  var { title, currentdate } = useParams();
  const [selectedDate, setSelectedDate] = useState(currentdate);
  const navigate = useNavigate();

  const [allMovieShow, setAllMovieShow] = useState([]);

  const [moviedata, setMovieData] = useState(null);

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/login");
    // }
    console.log("3rd");
    getMovieShowRecords();
    console.log("4th");
  }, [selectedDate]);

  useEffect(() => {
    console.log("1st");
    getMovieRecord();
    console.log("2nd");
  }, []);

  const getMovieRecord = async () => {
    const movieDetails = await axios.get(`/movie?title=${title}`);
    console.log("moviedetails " + movieDetails.data.successMessage[0]);
    setMovieData(movieDetails.data.successMessage[0]);
  };
  const getMovieShowRecords = async () => {
    console.log(title);
    console.log(selectedDate);
    try {
      setHeader(localStorage.getItem("token"));
      const movieShowData = await axios.get(
        `/show?title=${title}&date=${selectedDate}`
      );
      console.log(movieShowData);
      setAllMovieShow(movieShowData.data.successMessage);
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/");
    }
  };

  const handleShowDetails = (data) => {
    console.log("show id " + data._id);
    navigate(`/bookticket/${data._id}`);
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
    navigate("/");
  };

  const onBack = async () => {
    navigate(-1);
  };

  const handleDateTime = (newDateValue) => {
    window.history.replaceState(
      null,
      null,
      new Date(newDateValue).toISOString()
    );
    setSelectedDate(newDateValue);
    console.log(newDateValue);
  };

  return (
    moviedata && (
      <Layout>
        <div className="container">
          <div>
            <h3>
              {moviedata.title} - {moviedata.language + " "}
            </h3>
            <div>
              <p className="rounded-circle">{moviedata.movie_type}</p>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="mt-4 mb-4">
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={selectedDate}
                    onChange={handleDateTime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </div>
            <div className="row">
              {allMovieShow.length !== 0 ? (
                <>
                  {allMovieShow.map((data) => {
                    return (
                      <div key={data._id} className="col-md-3">
                        <button
                          type="button"
                          className="btn btn-outline-primary mr-2"
                          onClick={() => handleShowDetails(data)}
                        >
                          {moment(data.datetime).format("LT")}
                        </button>
                        <h6>
                          {" "}
                          {data.seat.length > 8 ? (
                            <h6> &#128308; fast filling</h6>
                          ) : (
                            ""
                          )}
                        </h6>
                        {localStorage.getItem("role") == "admin" && (
                          <>
                            <button
                              className="mr-2"
                              onClick={() => handleEditShowDetails(data)}
                            >
                              Edit{" "}
                            </button>
                            <button
                              onClick={() => handleDeleteShowDetails(data)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}{" "}
                </>
              ) : (
                <h5>"Oops No Any Show Available On The Selected Date"</h5>
              )}
            </div>
            <div className="mt-2">
              <a className="pointer-link" onClick={() => onBack()}>
                &#60;- Back
              </a>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default BookShow;
