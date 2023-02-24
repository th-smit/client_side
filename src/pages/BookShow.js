import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
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
  //const [datetime, setDateTime] = useState(moment(new Date()));
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getMovieShowRecords();
  }, []);

  const getMovieShowRecords = async () => {
    try {
      setHeader(localStorage.getItem("token"));
      const date = JSON.stringify(selectedDate);

      console.log(date);
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
  const handleDeleteShowDetails = (data) => {
    console.log();
    console.log(data);
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
                {movieShow.title} - {movieShow.language}
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
                {allMovieShow.map((data) => {
                  return (
                    <div key={data._id} className="col-md-3">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleShowDetails(data)}
                      >
                        {moment(data.datetime).format("LT")}
                      </button>

                      <button onClick={() => handleEditShowDetails(data)}>
                        edit{" "}
                      </button>
                      <button onClick={() => handleDeleteShowDetails(data)}>
                        delete
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
        </body>
      </Layout>
    </>
  );
};

export default BookShow;
