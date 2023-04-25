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
import { MdArrowBackIos } from "react-icons/md";

const BookShow = () => {
  var { title, currentdate } = useParams();

  const [selectedDate, setSelectedDate] = useState(currentdate);
  const navigate = useNavigate();

  const [allMovieShow, setAllMovieShow] = useState([]);

  const [moviedata, setMovieData] = useState(null);
  const [sortValue, setSortValue] = useState("all");

  const [startHour, setStartHour] = useState("0");
  const [endHour, setEndHour] = useState("23");

  useEffect(() => {
    getMovieRecord();
  }, [selectedDate]);

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/login");
    // }
    console.log("3rd");
    getMovieShowRecords();
    console.log("4th");
  }, [selectedDate]);

  useEffect(() => {
    if (sortValue === "1") {
      setStartHour(13);
      setEndHour(23);
    } else if (sortValue === "2") {
      setStartHour(5);
      setEndHour(12);
    } else {
      setStartHour(1);
      setEndHour(23);
    }
  }, [sortValue]);

  const getMovieRecord = async () => {
    const movieDetails = await axios.get(`/movie?title=${title}`);
    setMovieData(movieDetails.data.successMessage[0]);
  };
  const getMovieShowRecords = async () => {
    try {
      setHeader(localStorage.getItem("token"));
      const movieShowData = await axios.get(
        `/show?title=${title}&date=${selectedDate}`
      );
      setAllMovieShow(movieShowData.data.successMessage);
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/");
    }
  };

  const handleShowDetails = (data) => {
    navigate(`/bookticket/${data._id}`);
  };

  const onSortingChange = (event) => {
    setSortValue(event.target.value);
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
  };

  return (
    moviedata && (
      <Layout>
        <div className="container">
          <div className="mb-3">
            <button
              style={{ background: "#ff944d", marginTop: "10px" }}
              className="btn d-flex justify-items-center"
              onClick={() => onBack()}
            >
              <div style={{ marginTop: "2px" }}>
                <MdArrowBackIos />
              </div>
              <div>BACK</div>
            </button>
          </div>
          <h3>
            {moviedata.title} - {moviedata.language + " "}
          </h3>
          <div>
            <p className="rounded-circle">{moviedata.movie_type}</p>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col">
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
            <div className="">
              <h6 style={{ fontSize: "12px" }} className="mt-4 mb-4">
                &#128308; FAST FILLING &nbsp;&#128994; AVAILABLE{" "}
              </h6>
              <span>
                <select onChange={onSortingChange}>
                  <option value="all">All Time</option>
                  <option value="1">12PM - 11PM</option>
                  <option value="2">7AM - 11AM</option>
                </select>
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center m-2">
            {allMovieShow.length !== 0 ? <h3>Inox Cinema, Nadiad</h3> : ""}
          </div>
          <div className="row">
            {allMovieShow.length !== 0 ? (
              allMovieShow.map((data) => {
                return (
                  <>
                    {parseInt(moment(data.datetime).format("H")) >
                      parseInt(moment(new Date()).format("H")) && (
                      <div key={data._id} className="col-md-3">
                        <div>
                          <button
                            type="button"
                            className={`btn mr-2 ${
                              (data.seat.length * 100) / 126 > 80
                                ? "btn-outline-danger"
                                : "btn-outline-success"
                            }`}
                            onClick={() => handleShowDetails(data)}
                          >
                            {moment(data.datetime).format("LT")}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <h5>Oops No Any Show Available On The Selected Date</h5>
            )}
          </div>
        </div>
      </Layout>
    )
  );
};

export default BookShow;
