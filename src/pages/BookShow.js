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
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

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
    console.log("1st");
    getMovieRecord();
    console.log("2nd");
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

  // const handleEditShowDetails = (data) => {
  //   navigate("/editshow", {
  //     state: {
  //       movieDetails: data,
  //     },
  //   });
  // };
  // const handleDeleteShowDetails = async (data) => {
  //   console.log(data._id);
  //   const movieShowData = await axios.delete(`/show/${data._id}`);
  //   navigate(-1);
  // };

  const onSortingChange = (event) => {
    console.log(event.target.value);
    console.log(typeof event.target.value);
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
    console.log(newDateValue);
  };

  return (
    moviedata && (
      <Layout>
        <div className="container">
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
                  {/* <option selected disabled hidden>
                    Choose here
                  </option> */}
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
                    {startHour < parseInt(moment(data.datetime).format("H")) &&
                      endHour > parseInt(moment(data.datetime).format("H")) && (
                        <div key={data._id} className="col-md-3">
                          <>
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
                          </>
                        </div>
                      )}
                  </>
                );
              })
            ) : (
              <h5>"Oops No Any Show Available On The Selected Date"</h5>
            )}
          </div>
          <div className="mt-2">
            <button
              className="btn btn-primary pointer-link"
              onClick={() => onBack()}
            >
              &#60;- Back
            </button>
          </div>
        </div>
      </Layout>
    )
  );
};

export default BookShow;
