import React, { useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import moment from "moment";
import axios from "axios";
import { message } from "antd";

import { useNavigate } from "react-router-dom";

const ExportPDF = (props) => {
  const pdfExportComponent = useRef(null);
  const currenttime = new Date();
  const navigate = useNavigate();

  const handleClick = (data) => {
    console.log("clickable data is " + data);
    pdfExportComponent.current.save(data);
    console.log(data);
  };

  const onDeleteTicket = async (data) => {
    try {
      console.log(data);
      const deleteticket = await axios.delete(
        `/ticket?ticketid=${data._id}&showid=${data.show_id}`
      );
      console.log(deleteticket);
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error(error.response.data.errorMessage);
    }
  };

  return (
    <PDFExport ref={pdfExportComponent} paperSize="A4">
      <div
        key={props.data._id}
        // className="border bg-opacity-50 p-4 m-2 rounded"
      >
        <div>
          <div class="cardWrap">
            <div class="card cardLeft">
              <h1>
                Book My <span>Show</span>
              </h1>
              <div class="title">
                <h2>{props.data.movie_title}</h2>
                <span>movie</span>
              </div>

              <div class="seat">
                <div className="row">
                  <div className="col-md-3">
                    <h2>{props.data.price}</h2>
                    <span>Price</span>
                  </div>
                  {props.data.discount !== null && (
                    <div className="col-md-4">
                      <h2>{props.data.discount}</h2>
                      <span>Discount</span>
                    </div>
                  )}

                  {props.data.promo_name !== null && (
                    <div className="col-md-5">
                      <h2>{props.data.promo_name}</h2>
                      <span>Used Promo</span>
                    </div>
                  )}
                </div>
              </div>
              <div class="time">
                <h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-calendar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                  </svg>
                  {moment(props.data.show_datetime).format("MMM Do YY")} -{" "}
                  {moment(props.data.show_datetime).format("LT")}
                </h2>
                <span>Date & Time</span>
              </div>
              <div className="mt-3">
                <Button
                  type="button"
                  className="rounded"
                  primary={true}
                  onClick={(data) => handleClick()}
                  style={{
                    padding: "3px",
                    backgroundColor: "#f25a5a",
                    color: "white",
                  }}
                >
                  Download
                </Button>
                {currenttime > moment(props.data.show_datetime) ? (
                  ""
                ) : (
                  <>
                    <input
                      style={{
                        padding: "3px",
                        backgroundColor: "#f25a5a",
                        color: "white",
                      }}
                      type="button"
                      className="ml-2 border rounded"
                      value="Cancel Ticket"
                      onClick={() => onDeleteTicket(props.data)}
                    />
                  </>
                )}
              </div>
            </div>
            <div class="card cardRight">
              <div class="eye"></div>
              <div class="number">
                <h3> {" " + props.data.seat}</h3>
                <span>seat</span>
              </div>
              <div class="qrcode">
                <QRCode
                  id="qrCodeImage"
                  value={props.data}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </PDFExport>
  );
};

export default ExportPDF;
