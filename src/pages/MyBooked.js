import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout.js/Layout";
import { setHeader, clearStorage } from "./Utils";
import axios from "axios";
import { useState } from "react";
import moment from "moment/moment";
import { message } from "antd";
import QRCode from "qrcode.react";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ExportPDF from "../component/ExportPdf/ExportPDF";
import { MdArrowBackIos } from "react-icons/md";

const MyBooked = () => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;

  const navigate = useNavigate();
  const [allTicket, setAllTicket] = useState([]);
  const currenttime = new Date();
  useEffect(() => {
    console.log("from homepage " + localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getTicketRecords();
    console.log("hello");
  }, []);

  const getTicketRecords = async () => {
    try {
      setHeader(localStorage.getItem("token"));
      const userEmail = localStorage.getItem("email");
      const TicketData = await axios.get(`/ticket?email=${userEmail}`);
      setAllTicket(TicketData.data.successMessage);
    } catch (error) {
      console.log(error);
      //clearStorage();
      navigate("/login");
    }
  };

  const onBack = async () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="">
        <div className="mb-2 mt-2">
          <button
            style={{ background: "#ff944d" }}
            className="btn d-flex justify-items-center"
            onClick={() => onBack()}
          >
            <div style={{ marginTop: "2px" }}>
              <MdArrowBackIos />
            </div>

            <div>BACK</div>
          </button>
        </div>
        {allTicket.length !== 0 ? (
          <div className="row">
            {allTicket.map((data) => {
              return (
                <span className="col-md-6">
                  <ExportPDF data={data} />
                </span>
              );
            })}
          </div>
        ) : (
          <h5 className="mt-3">"No ticket booked yet" </h5>
        )}
      </div>
    </Layout>
  );
};

export default MyBooked;
