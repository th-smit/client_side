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
const EditPromo = () => {
  var { id } = useParams();
  console.log("promocode data " + id);
  const [promoData, setPromoData] = useState(null);

  useEffect(() => {
    getPromoRecord();
  }, []);

  const getPromoRecord = async () => {
    // const promoRecord = await axios.get(`/promocode`);
    const promoRecord = await axios.get(`/promocode/${id}`);
    console.log(promoRecord.data.successMessage[0]);
    setPromoData(promoRecord.data.successMessage[0]);
  };

  return (
    promoData !== null && (
      <>
        <div>hello</div>
        <p>{promoData.promo_name}</p>
        <p>{promoData.active_status}</p>
        <p>{promoData.expiry_date}</p>
        <p>{promoData.limit}</p>
        <p>{promoData.promocode_type}</p>
        {/* <h6>{promoData[0].promo_name}</h6> */}
        {/* <h6>{promoData}</h6> */}
      </>
    )
  );
};

export default EditPromo;
