import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setHeader, clearStorage } from "./Utils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox from "@mui/material/Checkbox";
import { MdArrowBackIos } from "react-icons/md";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const EditMovieDetails = () => {
  const navigate = useNavigate();
  const [moviedata, setMovieData] = useState(null);
  const [language, setLanguage] = useState(null);
  const [format, setFormat] = useState(null);
  const [date, setDate] = useState(null);

  var { title } = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDate = (newDateValue) => {
    console.log(newDateValue);
  };

  useEffect(() => {
    getMovieRecord();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      if (moviedata == null) {
      } else {
        setValue("title", moviedata.title);
        setValue("description", moviedata.description);
        setValue("movie_type", moviedata.movie_type);
        setValue("poster_api", moviedata.poster_api);
        setValue("is_released", moviedata.is_released);
        setValue("hour", moviedata.hour);
        setValue("minute", moviedata.minute);
        setLanguage(moviedata.language);
        setFormat(moviedata.format);
        setDate(dayjs(moviedata.date));
      }
    }
  }, [moviedata]);

  const getMovieRecord = async () => {
    const movieDetails = await axios.get(`/movie?title=${title}`);
    let temp = movieDetails.data.successMessage[0];
    setMovieData(temp);
  };

  const onEditMovieDetailSubmit = async (values) => {
    try {
      values.language = language;
      values.format = format;
      values.date = date;
      setHeader(localStorage.getItem("token"));
      await axios.put(`/movie/${moviedata._id}`, values);
      navigate(-1);
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/login");
    }
  };

  const onBack = async () => {
    navigate(-1);
  };

  const handleLanguage = async (e) => {
    if (moviedata !== null) {
      if (language.includes(e.target.value)) {
        setLanguage(language.filter((value) => value !== e.target.value));
        e.target.style.backgroundColor = "#efefef";
      } else {
        setLanguage([...language, e.target.value]);
        e.target.style.backgroundColor = "#ffd199";
      }
    }
  };

  const handleFormat = async (e) => {
    if (moviedata !== null) {
      if (format.includes(e.target.value)) {
        setFormat(format.filter((value) => value !== e.target.value));
        e.target.style.backgroundColor = "#efefef";
      } else {
        setFormat([...format, e.target.value]);
        e.target.style.backgroundColor = "#ffd199";
      }
    }
  };
  try {
    return (
      language !== null && (
        <>
          {console.log("3rd")}
          <form
            className="App1"
            onSubmit={handleSubmit(onEditMovieDetailSubmit)}
          >
            <div className="row">
              <span className="col-sm-2">
                <a
                  onClick={() => onBack()}
                  style={{
                    fontSize: "20px",
                    background: "#F6D3A3",
                    marginLeft: "2px",
                  }}
                >
                  <MdArrowBackIos />
                </a>
              </span>
              <span className="col-md-7" style={{ marginLeft: "10px" }}>
                <h3 className="title1">Edit Movie Details</h3>
              </span>
            </div>
            <label htmlFor="title">Movie Title : &nbsp;</label>
            <TextField
              type="text"
              id="outlined-basic"
              label="Movie Title"
              variant="outlined"
              disabled
              {...register("title", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
            />
            <p>
              {errors.title && (
                <span style={{ color: "red" }}>
                  title is mandatory, must be length between 3-100{" "}
                </span>
              )}
            </p>

            <label htmlFor="description">Description : &nbsp;</label>
            <TextareaAutosize
              type="textarea"
              aria-label="empty textarea"
              label="Movie Title"
              style={{
                width: 565,
                height: 100,
                background: "#F6D3A3",
                borderRadius: "5px",
              }}
              {...register("description", {
                required: true,
                minLength: 3,
                maxLength: 5000,
              })}
            />
            <p>
              {errors.description && (
                <span style={{ color: "red" }}>
                  description is mandatory, must be length between 3-5000{" "}
                </span>
              )}
            </p>

            <label htmlFor="poster_api">Poster_API : &nbsp;</label>
            <TextField
              type="text"
              id="outlined-basic"
              label="Movie Title"
              variant="outlined"
              {...register("poster_api", {
                required: true,
              })}
            />
            <p>
              {errors.poster_api && (
                <span style={{ color: "red" }}>poster_api is mandatory</span>
              )}
            </p>

            <label htmlFor="movie_type">Movie Type : &nbsp;</label>
            <TextField
              type="text"
              id="outlined-basic"
              label="Movie Title"
              variant="outlined"
              {...register("movie_type", {
                required: true,
                minLength: 4,
                maxLength: 50,
              })}
            />
            <p>
              {errors.movie_type && (
                <span style={{ color: "red" }}>
                  Movie type is mandatory must be length between 4-50{" "}
                </span>
              )}
            </p>
            <div className="row mb-4">
              <div className="col-md-5" style={{ marginTop: "30px" }}>
                <label htmlFor="is_released">Is_Released ? &nbsp;</label>
                <Checkbox
                  type="checkbox"
                  {...register("is_released")}
                ></Checkbox>
              </div>
              <div className="col-md-7">
                Release Date:
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      sx={{ backgroundColor: "white" }}
                      label="Date"
                      inputFormat="MM/DD/YYYY"
                      value={date}
                      onChange={handleDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            <div className="mt-1">
              Movie Length :
              <div className="mt-3 d-flex justify-content-around">
                <span>
                  <label className="mt-1" htmlFor="hour">
                    Hour : &nbsp;
                  </label>
                  <TextField
                    inputProps={{
                      style: {
                        height: "5px",
                        width: "100px",
                      },
                    }}
                    className=" mr-1"
                    type="text"
                    {...register("hour", {
                      required: true,
                    })}
                  />
                </span>
                <span>
                  <label className="mt-1" htmlFor="minute">
                    Minute : &nbsp;
                  </label>
                  <TextField
                    inputProps={{
                      style: {
                        height: "5px",
                        width: "100px",
                      },
                    }}
                    type="text"
                    {...register("minute", {
                      required: true,
                    })}
                  />
                </span>
              </div>
            </div>
            <div className="mt-4">
              Language :&nbsp;
              <input
                type="button"
                value="Hindi"
                style={{
                  background: moviedata.language.includes("Hindi")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="English"
                style={{
                  background: moviedata.language.includes("English")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="Tamil"
                style={{
                  background: moviedata.language.includes("Tamil")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="Malayalam"
                style={{
                  background: moviedata.language.includes("Malayalam")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="Telugu"
                style={{
                  background: moviedata.language.includes("Telugu")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
            </div>
            <div className="mt-2">
              Format : &nbsp;
              <input
                type="button"
                value="2D"
                style={{
                  background: moviedata.format.includes("2D")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleFormat}
              />
              <input
                type="button"
                value="3D"
                style={{
                  background: moviedata.format.includes("3D")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleFormat}
              />
              <input
                type="button"
                value="4DX"
                style={{
                  background: moviedata.format.includes("4DX")
                    ? "#ffd199"
                    : "#efefef",
                  padding: "3px",
                  borderRadius: "8px",
                }}
                className="mr-2"
                onClick={handleFormat}
              />
            </div>
            <input
              type="submit"
              style={{ background: "#f7b067" }}
              className="btn mt-2"
              value="Update"
            />
          </form>
        </>
      )
    );
  } catch (error) {
    console.log(error);
  }
};

export default EditMovieDetails;
