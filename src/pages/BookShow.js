import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage, setHeader } from "./Utils";
import moment from "moment/moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BookShow = () => {
  const movieShow = useLocation().state.movieDetails;
  const navigate = useNavigate();
  const [allMovieShow, setAllMovieShow] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getMovieShowRecords();
  }, [selectedDate]);

  const getMovieShowRecords = async () => {
    try {
      setHeader(localStorage.getItem("token"));
      const movieShowData = await axios.get(
        `/show?title=${movieShow.title}&date=${selectedDate}`
      );

      setAllMovieShow(movieShowData.data.successMessage);
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/");
    }
  };

  const handleShowDetails = (data) => {
    console.log(data);
    navigate("/bookticket", {
      state: {
        movieData: data,
        date: selectedDate,
      },
    });
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

  const onBack = async () => {
    navigate(-1);
  };

  const handleDateTime = (newDateValue) => {
    setSelectedDate(newDateValue);
    console.log(newDateValue);
  };

  return (
    <>
      <Layout>
        <body>
          <div className="container">
            <div>
              <h3>
                {movieShow.title} - {movieShow.language + " "}
              </h3>
              <div>
                <p className="rounded-circle">{movieShow.movie_type}</p>
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
        </body>
      </Layout>
    </>
  );
};

export default BookShow;
