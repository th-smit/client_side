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
    console.log("1st");
    getMovieRecord();
  }, []);
  useEffect(() => {
    console.log("2nd");
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      if (moviedata == null) {
        console.log("data null");
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
    console.log("1st");
    const movieDetails = await axios.get(`/movie?title=${title}`);

    console.log(movieDetails.data.successMessage[0]);
    let temp = movieDetails.data.successMessage[0];
    console.log(temp._id);
    setMovieData(temp);
  };

  const onEditMovieDetailSubmit = async (values) => {
    try {
      values.language = language;
      values.format = format;
      values.date = date;
      console.log("updated value" + values);
      setHeader(localStorage.getItem("token"));
      const newUserData = await axios.put(`/movie/${moviedata._id}`, values);
      console.log(newUserData);
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
    console.log(e.target.value);
    console.log(language);
    if (moviedata !== null) {
      if (language.includes(e.target.value)) {
        setLanguage(language.filter((value) => value !== e.target.value));
        e.target.style.backgroundColor = "#efefef";
      } else {
        setLanguage([...language, e.target.value]);
        e.target.style.backgroundColor = "lightblue";
      }
    }
  };

  const handleFormat = async (e) => {
    console.log(e.target.value);
    if (moviedata !== null) {
      if (format.includes(e.target.value)) {
        setFormat(format.filter((value) => value !== e.target.value));
        e.target.style.backgroundColor = "#efefef";
      } else {
        setFormat([...format, e.target.value]);
        e.target.style.backgroundColor = "lightblue";
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
            <h3 className="title">Edit Movie Details</h3>
            <label htmlFor="title">Movie Title : &nbsp;</label>
            <input
              type="text"
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
            <textarea
              type="text"
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
            <input
              type="text"
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
            <input
              type="text"
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
            <div>
              <label htmlFor="is_released">Is_Released ? &nbsp;</label>
              <input type="checkbox" {...register("is_released")}></input>
            </div>
            <div>
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

            <div>
              Movie Length :
              <div>
                <label htmlFor="hour">Hour : &nbsp;</label>
                <input
                  className="w-25 mr-1"
                  type="text"
                  {...register("hour", {
                    required: true,
                  })}
                />
                <label htmlFor="minute">Minute : &nbsp;</label>
                <input
                  className="w-25"
                  type="text"
                  {...register("minute", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="mt-4">
              Language :&nbsp;
              <input
                type="button"
                value="Hindi"
                style={{
                  background: moviedata.language.includes("Hindi")
                    ? "lightblue"
                    : "#efefef",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="English"
                style={{
                  background: moviedata.language.includes("English")
                    ? "lightblue"
                    : "#efefef",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="Tamil"
                style={{
                  background: moviedata.language.includes("Tamil")
                    ? "lightblue"
                    : "#efefef",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="Malayalam"
                style={{
                  background: moviedata.language.includes("Malayalam")
                    ? "lightblue"
                    : "#efefef",
                }}
                className="mr-2"
                onClick={handleLanguage}
              />
              <input
                type="button"
                value="Telugu"
                style={{
                  background: moviedata.language.includes("Telugu")
                    ? "lightblue"
                    : "#efefef",
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
                    ? "lightblue"
                    : "#efefef",
                }}
                className="mr-2"
                onClick={handleFormat}
              />
              <input
                type="button"
                value="3D"
                style={{
                  background: moviedata.format.includes("3D")
                    ? "lightblue"
                    : "#efefef",
                }}
                className="mr-2"
                onClick={handleFormat}
              />
              <input
                type="button"
                value="4DX"
                style={{
                  background: moviedata.format.includes("4DX")
                    ? "lightblue"
                    : "#efefef",
                }}
                className="mr-2"
                onClick={handleFormat}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Update" />
            <div className="mt-2">
              <button
                className="btn btn-primary pointer-link"
                onClick={() => onBack()}
              >
                &#60;- Back
              </button>
            </div>
          </form>
        </>
      )
    );
  } catch (error) {
    console.log(error);
  }
};

export default EditMovieDetails;
