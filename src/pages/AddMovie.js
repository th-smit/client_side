/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage, setHeader } from "./Utils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ButtonCom from "../component/Button/ButtonCom";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Checkbox from "@mui/material/Checkbox";
import { MdArrowBackIos } from "react-icons/md";

function AddMovie() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState([]);
  const [format, setFormat] = useState([]);
  const [date, setDate] = React.useState(dayjs(new Date()));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDate = (newDateValue) => {
    setDate(newDateValue);
    console.log(newDateValue);
  };

  useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const onAddMovieDetailSubmit = async (values) => {
    try {
      if (language.length === 0 || format.length === 0) {
        throw new Error("array is empty");
      } else {
        values.language = language;
        values.format = format;
        values.date = date;
        setHeader(localStorage.getItem("token"));
        await axios.post("/movie", values);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.errorMessage);
      navigate("/");
      // clearStorage();
      // navigate("/login");
    }
  };

  useEffect(() => {
    if (!(localStorage.getItem("role") === "admin")) {
      navigate("/");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  const onBack = async () => {
    navigate("/");
  };

  const handleLanguage = async (e) => {
    if (language.includes(e.target.value)) {
      setLanguage(language.filter((value) => value !== e.target.value));
      e.target.style.backgroundColor = "#efefef";
    } else {
      setLanguage([...language, e.target.value]);
      e.target.style.backgroundColor = "#ffd199";
    }
  };

  const handleFormat = async (e) => {
    if (format.includes(e.target.value)) {
      setFormat(format.filter((value) => value !== e.target.value));
      e.target.style.backgroundColor = "#efefef";
    } else {
      setFormat([...format, e.target.value]);
      e.target.style.backgroundColor = "#ffd199";
    }
  };
  return (
    <>
      <div>
        <form className="App1" onSubmit={handleSubmit(onAddMovieDetailSubmit)}>
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
              <h3 className="title1">Add Movies</h3>
            </span>
          </div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "35ch" },
            }}
            noValidate
            autoComplete="off"
          ></Box>
          <label htmlFor="title">Movie Title : &nbsp;</label>
          <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
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
            label="Movie Title"
            style={{
              width: 565,
              height: 100,
              background: "#F6D3A3",
              borderRadius: "5px",
            }}
            aria-label="my textarea"
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
              <Checkbox type="checkbox" {...register("is_released")}></Checkbox>
            </div>
            <div className="col-md-7">
              Release Date:
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={date}
                    disablePast
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div>
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
              style={{ padding: "3px", borderRadius: "8px" }}
              type="button"
              value="Hindi"
              className="mr-2"
              onClick={handleLanguage}
            />
            <input
              style={{ padding: "3px", borderRadius: "8px" }}
              type="button"
              value="English"
              className="mr-2"
              onClick={handleLanguage}
            />
            <input
              style={{ padding: "3px", borderRadius: "8px" }}
              type="button"
              value="Tamil"
              className="mr-2"
              onClick={handleLanguage}
            />
            <input
              style={{ padding: "3px", borderRadius: "8px" }}
              type="button"
              value="Malayalam"
              className="mr-2"
              onClick={handleLanguage}
            />
            <input
              style={{ padding: "3px", borderRadius: "8px" }}
              type="button"
              value="Telugu"
              className="mr-2"
              onClick={handleLanguage}
            />
          </div>
          <div className="mt-2">
            Format : &nbsp;
            <ButtonCom value="2D" onHandleFormat={handleFormat} />
            <ButtonCom value="3D" onHandleFormat={handleFormat} />
            <ButtonCom value="4DX" onHandleFormat={handleFormat} />
          </div>
          <input
            type="submit"
            style={{ background: "#f7b067" }}
            className="btn mt-3"
            value="Add"
          />
        </form>
      </div>
    </>
  );
}
export default AddMovie;
