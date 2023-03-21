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
import { useForm } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

// ----------------
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
// ---------------

const EditPromo = () => {
  var { id } = useParams();
  console.log("promocode data " + id);
  const [promoData, setPromoData] = useState(null);
  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [promo_type, setPromo_type] = useState();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // --------------
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
    getPromoRecord();
  }, []);

  useEffect(() => {
    if (promoData !== null) {
      setValue("promo_name", promoData.promo_name);
      setValue("active_status", promoData.active_status);
      setValue("count", promoData.limit);
      setValue("promo_type", promoData.promocode_type);
      setPromo_type(promoData.promocode_type);
      console.log("promo type is " + promoData.promocode_type);
      setDate(moment(promoData.expiry_date));
    }
  }, [promoData]);

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

  // ---------------

  const getPromoRecord = async () => {
    const promoRecord = await axios.get(`/promocode/${id}`);
    console.log("promo is " + promoRecord.data.successMessage[0]);
    setPromoData(promoRecord.data.successMessage[0]);
    const movieRecord = await axios.get("/movie");

    setMovieData(movieRecord.data.successMessage);
  };

  const onUpdateDetailSubmit = async (values) => {
    values.movies = personName;
    values.expiry_date = date;
    console.log("promocode value " + JSON.stringify(values));
    try {
      const updatedData = axios.put(`/promocode/${id}`, values);
      // console.log()
      console.log(updatedData);
      // navigate("/");
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/login");
    }
  };

  const handleDateTime = (newDateValue) => {
    setDate(newDateValue);
    console.log("date is " + newDateValue);
  };

  const handleType = async (e) => {
    console.log("type is " + e.target.value);
    setPromo_type(e.target.value);
  };
  return (
    promoData &&
    movieData && (
      <Layout>
        <>
          <form className="App1" onSubmit={handleSubmit(onUpdateDetailSubmit)}>
            <p>
              <label htmlFor="promo_name">PromoCode Name : &nbsp;</label>
              <input
                type="text"
                {...register("promo_name", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor="active_status">Active : &nbsp;</label>
              <input type="checkbox" {...register("active_status")} />
            </p>
            <p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={date}
                    onChange={handleDateTime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </p>
            <p>
              <label htmlFor="count">count : &nbsp;</label>
              <input
                type="text"
                {...register("count", {
                  required: true,
                })}
              />
            </p>
            <div
              className="d-flex justify-content-around"
              onChange={handleType}
            >
              {/* <label htmlFor="promo_type"> &nbsp;</label> */}
              Promo_Type :
              <input
                type="radio"
                value="Percentage"
                checked={promo_type === "Percentage"}
                {...register("promo_type", {})}
              />
              <span>Percentage</span>
              <input
                type="radio"
                value="Flat"
                checked={promo_type === "Flat"}
                {...register("promo_type", {})}
              />
              <span>Flat</span>
            </div>
            <p>
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">Movies</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
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
            </p>
            <input
              type="submit"
              className="btn btn-primary mt-3"
              value="Update"
            />
          </form>
        </>
      </Layout>
    )
  );
};

export default EditPromo;
