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

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { message } from "antd";
import { MdArrowBackIos } from "react-icons/md";

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

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [movieData, setMovieData] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    getMovieRecord();
  }, [promocode_type]);

  const getMovieRecord = async () => {
    const movieRecord = await axios.get("/movie");
    console.log("movie record is" + movieRecord);
    setMovieData(movieRecord.data.successMessage);
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
    values.movies = personName;
    console.log("promocode value " + JSON.stringify(values));
    try {
      await axios.post("/promocode", values);
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error(error.response.data.errorMessage);
      // clearStorage();
      // navigate("/");
    }
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onAddMovieDetailSubmit)}>
        <div className="row">
          <button
            onClick={() => onBack()}
            style={{
              fontSize: "20px",
              background: "#F6D3A3",
              marginLeft: "2px",
            }}
            className="col-md-2"
          >
            <MdArrowBackIos />
          </button>
          <span>
            <h3 className="promocode" style={{ marginLeft: "80px" }}>
              Add PromoCode
            </h3>
          </span>
        </div>
        <label htmlFor="promo_name">PromoCode Name : &nbsp;</label>
        <TextField
          type="text"
          {...register("promo_name", {
            required: true,
          })}
        />
        <p>
          {errors.promo_name && (
            <span style={{ color: "red" }}>promocode name is mandatory</span>
          )}
        </p>

        <label htmlFor="discount">Discount : &nbsp;</label>
        <TextField
          type="number"
          min={promocode_type === "Percentage" ? 1 : 1}
          max={promocode_type === "Percentage" ? 100 : undefined}
          {...register("discount", {
            required: true,
          })}
        />
        <p>
          {errors.discount && (
            <span style={{ color: "red" }}>promocode number is mandatory</span>
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
        <TextField
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
        <div className="d-flex justify-content-center" onChange={handleType}>
          <span>
            <label htmlFor="promocode_type">Promocode Type : &nbsp;</label>
          </span>
          <span>
            <span className="">
              <input
                type="radio"
                name="type"
                value="Flat"
                // className="mr-2"
                style={{ width: "18px" }}
                // onClick={handleType}
              />

              <span className="ml-2">Flat</span>
            </span>
            <span className="ml-4">
              <input
                type="radio"
                name="type"
                value="Percentage"
                // className="mr-2"
                style={{ width: "18px" }}
                // onClick={handleType}
              />

              <span className="ml-2">Percentage</span>
            </span>
          </span>
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Movies</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {movieData !== null &&
                movieData.map((name) => (
                  <MenuItem
                    key={name.title}
                    value={name.title}
                    style={getStyles(name.title, personName, theme)}
                  >
                    {name.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="mt-3">
          <label htmlFor="active_status">Active ? &nbsp;</label>
          <input type="checkbox" {...register("active_status")}></input>
        </div>

        <input
          type="submit"
          style={{ background: "#f7b067" }}
          className="btn mt-3"
          value="Add"
        />
        {/* <div className="mt-2">
          <button
            style={{ background: "#f7b067" }}
            className="btn pointer-link"
            onClick={() => onBack()}
          >
            &#60;- Back
          </button>
        </div> */}
      </form>
    </>
  );
};

export default AddPromoCode;
