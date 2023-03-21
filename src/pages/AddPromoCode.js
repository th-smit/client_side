import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage, setHeader } from "./Utils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const AddPromoCode = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [expiry_date, setExpiryDate] = React.useState(dayjs(new Date()));
  const [promocode_type, setType] = useState(null);
  const [movies, setMovies] = useState([]);

  const handleDate = (newDateValue) => {
    setExpiryDate(newDateValue);
    console.log(newDateValue);
  };

  const onBack = async () => {
    navigate(-1);
  };

  const handleType = async (e) => {
    console.log(e.target.value);
    setType(e.target.value);
    // if (promocode_type.includes(e.target.value)) {
    //   setType("");
    //   e.target.style.backgroundColor = "#efefef";
    // } else {
    //   setType([e.target.value]);
    //   e.target.style.backgroundColor = "lightblue";
    // }
  };

  const onAddMovieDetailSubmit = async (values) => {
    values.promocode_type = promocode_type;
    values.expiry_date = expiry_date;
    values.movies = movies;
    console.log("promocode value " + JSON.stringify(values));
    try {
      // if (language.length === 0 || format.length === 0) {
      //   throw new Error("array is empty");
      // } else {
      // setHeader(localStorage.getItem("token"));
      await axios.post("/promocode", values);
      navigate("/");
      // }
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/login");
    }
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onAddMovieDetailSubmit)}>
        <h3 className="promocode">Add PromoCode</h3>
        <label htmlFor="promo_name">PromoCode Name : &nbsp;</label>
        <input
          type="text"
          {...register("promo_name", {
            required: true,
          })}
        />
        <p>
          {errors.title && (
            <span style={{ color: "red" }}>promocode name is mandatory</span>
          )}
        </p>

        <div>
          Expiry Date:
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={expiry_date}
                disablePast
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>

        <label htmlFor="limit">Limit : &nbsp;</label>
        <input
          type="number"
          {...register("limit", {
            required: true,
          })}
        />
        <p>
          {errors.title && (
            <span style={{ color: "red" }}>limit is mandatory</span>
          )}
        </p>

        {/* <input
          type="text"
          {...register("promocode_type", {
            required: true,
          })}
        /> */}
        <div className="d-flex justify-content-around" onChange={handleType}>
          <label htmlFor="promocode_type">Promocode Type : &nbsp;</label>
          <span>
            <input
              type="radio"
              name="type"
              value="Flat"
              // className="mr-2"
              style={{ width: "18px" }}
              // onClick={handleType}
            />
          </span>

          <span>Flat</span>
          <span>
            <input
              type="radio"
              name="type"
              value="Percentage"
              // className="mr-2"
              style={{ width: "18px" }}
              // onClick={handleType}
            />
          </span>

          <span>Percentage</span>
        </div>

        <div className="mt-3">
          <label htmlFor="active_status">Active ? &nbsp;</label>
          <input type="checkbox" {...register("active_status")}></input>
        </div>

        <input type="submit" className="btn btn-primary mt-3" value="Add" />
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
  );
};

export default AddPromoCode;
