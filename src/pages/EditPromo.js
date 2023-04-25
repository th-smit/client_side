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
import { MdArrowBackIos } from "react-icons/md";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const EditPromo = () => {
  var { id } = useParams();
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
      setValue("discount", promoData.discount);
      setValue("active_status", promoData.active_status);
      setValue("count", promoData.limit);
      setValue("promo_type", promoData.promocode_type);
      setPromo_type(promoData.promocode_type);
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

  const getPromoRecord = async () => {
    const promoRecord = await axios.get(`/promocode?id=${id}`);
    setPromoData(promoRecord.data.successMessage[0]);
    setPersonName(promoRecord.data.successMessage[0].movies);
    const movieRecord = await axios.get("/movie");
    setMovieData(movieRecord.data.successMessage);
  };

  const onUpdateDetailSubmit = async (values) => {
    values.movies = personName;
    values.expiry_date = date;
    try {
      axios.put(`/promocode/${id}`, values);
      navigate("/");
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/login");
    }
  };

  const handleDateTime = (newDateValue) => {
    setDate(newDateValue);
  };

  const handleType = async (e) => {
    setPromo_type(e.target.value);
  };
  const onBack = async () => {
    navigate(-1);
  };
  return (
    promoData &&
    movieData && (
      <Layout>
        <>
          <form className="App1" onSubmit={handleSubmit(onUpdateDetailSubmit)}>
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
                  Edit PromoCode
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
                <span style={{ color: "red" }}>
                  promocode name is mandatory
                </span>
              )}
            </p>

            <label htmlFor="discount">Discount : &nbsp;</label>
            <TextField
              type="number"
              min={promo_type === "Percentage" ? 1 : 1}
              max={promo_type === "Percentage" ? 100 : undefined}
              {...register("discount", {
                required: true,
              })}
            />
            <p>
              {errors.discount && (
                <span style={{ color: "red" }}>
                  promocode number is mandatory
                </span>
              )}
            </p>
            <div>
              Expiry Date:
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={date}
                    onChange={handleDateTime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <label htmlFor="count">limit : &nbsp;</label>
            <TextField
              type="text"
              {...register("count", {
                required: true,
              })}
            />

            <div
              className="mt-4 mb-2 d-flex justify-content-center"
              onChange={handleType}
            >
              <span>
                <label htmlFor="promocode_type">Promocode Type : &nbsp;</label>
              </span>
              <span>
                <input
                  type="radio"
                  value="Percentage"
                  checked={promo_type === "Percentage"}
                  {...register("promo_type", {})}
                />
                <span className="ml-2">Percentage</span>

                <span className="ml-4">
                  <input
                    type="radio"
                    value="Flat"
                    checked={promo_type === "Flat"}
                    {...register("promo_type", {})}
                  />
                  <span className="ml-2">Flat</span>
                </span>
              </span>
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
            <div className="mt-1">
              <label htmlFor="active_status">Active : &nbsp;</label>
              <input type="checkbox" {...register("active_status")} />
            </div>
            <input
              type="submit"
              style={{ background: "#f7b067" }}
              className="btn mt-3"
              value="Update"
            />
          </form>
        </>
      </Layout>
    )
  );
};

export default EditPromo;
