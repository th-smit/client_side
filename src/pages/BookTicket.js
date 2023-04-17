import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import moment from "moment/moment";
import SeatCom from "../component/Button/SeatCom";
import "../App.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { MdDiscount } from "react-icons/md";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const BookTicket = () => {
  const query = new URLSearchParams(window.location.search);
  const seats = query.get("seats");

  const navigate = useNavigate();
  const seat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [price, setPrice] = useState(0);
  const [temSeat, setTemSeat] = useState(seats == null ? [] : seats.split(","));
  const bookedSeat = [null];
  const [unBookedSeat, setUnbooked] = useState([]);
  const [summary, setSummary] = useState(false);

  const [discount, setDiscount] = useState();

  const [elementVisible, setElementVisible] = useState(false);
  const [promocodeList, setPromocodeList] = useState(null);
  const [grandTotal, setGrandTotal] = useState();

  const [applyStatus, setApplyStatus] = useState(false);
  const [promocodeType, setPromocodeType] = useState();
  const [promoName, setPromoName] = useState();
  const [promoId, setPromoId] = useState();

  const [promoDiscount, setPromoDiscount] = useState();
  const [promoExpiry_Date, setPromoExpiry_Date] = useState();
  const [promoLimit, setPromoLimit] = useState();
  const [promoActive_Status, setPromoActive_Status] = useState();

  const [userPromo, setUserPromo] = useState();
  let [userPromoArray] = useState([]);
  const useremail = localStorage.getItem("email");

  const seatRow = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  const [showdata, setShowData] = useState(null);

  var { id } = useParams();

  const onBack = async () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (temSeat.length === 0) {
      window.history.replaceState(
        null,
        null,
        window.location.href.split("?")[0]
      );
    } else {
      window.history.replaceState(null, null, `?seats=${temSeat.toString()}`);
    }
  }, [temSeat]);

  useEffect(() => {
    getShowData();
    getPromoData();
    getMovieId();
    // getUserPromo();
    let totalprice = 0;
    temSeat.map((data) => {
      if (selectedSeat !== null) {
        if (!selectedSeat.includes(data)) {
          console.log("2nd");
          if (data[0].charCodeAt() > 67 && data[0].charCodeAt() <= 73) {
            totalprice = totalprice + 150;
          } else if (data[0].charCodeAt() > 73) {
            totalprice = totalprice + 180;
          } else {
            totalprice = totalprice + 120;
          }
        } else {
          console.log("pushed data " + data);
          bookedSeat.push(data);
        }
      }
    });

    if (bookedSeat.length !== 1) {
      message.error(bookedSeat.slice(1) + " seat already booked");
      console.log("bookes seat array " + bookedSeat);
      console.log("length of bookes seat aaray " + bookedSeat.length);
    }

    setPrice(totalprice);
    console.log("unbooked seat " + unBookedSeat);
  }, [selectedSeat]);

  const getShowData = async () => {
    console.log("function2 called");
    const showData = await axios.get(`/show/seat/${id}`);

    console.log(
      "movie data is " + JSON.stringify(showData.data.successMessage[0].title)
    );
    setShowData(showData.data.successMessage[0]);
    if (selectedSeat === null) {
      setSelectedSeat(showData.data.successMessage[0].seat);
    }
  };

  const getMovieId = async () => {
    try {
      const movieId = axios.get(`/show/movieid/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getPromoData = async () => {
    try {
      const promoData = await axios.get(
        `/promocode/${useremail}/${showdata.title}`
      );
      console.log("final data is ", promoData);
      setPromocodeList(promoData.data.successMessage);
    } catch (error) {
      console.log("error in fetching data from the promocode " + error);
    }
  };
  const handleSeat = async (e) => {
    if (temSeat.includes(e.target.value)) {
      const index = temSeat.indexOf(e.target.value);
      temSeat.splice(index, 1);
      setTemSeat([...temSeat]);
      e.target.style.backgroundColor = "white";
      console.log("target value" + e.target.value.charCodeAt(0));
      if (
        e.target.value.charCodeAt(0) > 67 &&
        e.target.value.charCodeAt(0) <= 73
      ) {
        setPrice(price - 150);
      } else if (e.target.value.charCodeAt(0) > 73) {
        setPrice(price - 180);
      } else {
        setPrice(price - 120);
      }
    } else {
      setTemSeat([...temSeat, e.target.value]);
      e.target.style.backgroundColor = "green";

      if (
        e.target.value.charCodeAt(0) > 67 &&
        e.target.value.charCodeAt(0) <= 73
      ) {
        setPrice(price + 150);
      } else if (e.target.value.charCodeAt(0) > 73) {
        setPrice(price + 180);
      } else {
        setPrice(price + 120);
      }
    }
  };
  const onPay = async () => {
    try {
      console.log("grand total is " + grandTotal);
      const ticketDetails = {
        seat: temSeat,
        movieTitle: showdata.title,
        date: showdata.datetime,
        price: grandTotal,
        username: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        showid: showdata._id,
        promoname: promoName,
        promoid: promoId,
        promoDiscount: promoDiscount,
        expiry_date: promoExpiry_Date,
        limit: promoLimit,
        active_status: promoActive_Status,
        promocode_type: promocodeType,
        saving: discount,
      };

      console.log("promo name " + ticketDetails.promoname);
      console.log("promo id " + ticketDetails.promoid);
      console.log("promo discount " + ticketDetails.promoDiscount);
      console.log("promo expiry date " + ticketDetails.expiry_date);
      console.log("promo limit " + ticketDetails.limit);
      console.log("promo active_status " + ticketDetails.active_status);
      console.log("promo type " + ticketDetails.promocode_type);

      console.log("movie title using show" + ticketDetails.movieTitle);
      console.log("show date " + ticketDetails.date);
      console.log("show id " + ticketDetails.showid);
      console.log("movie title " + ticketDetails.title);

      console.log("email " + ticketDetails.email);

      console.log("discount " + ticketDetails.saving);

      console.log("grand total " + ticketDetails.price);

      console.log("selected seat " + ticketDetails.seat);

      const unbookedseat = await axios.post("/ticket", ticketDetails);
      // console.log("ticket data is " + unbookedseat.data.successMessage._id);
      // console.log("movieShowData[0] " + unbookedseat.data.successMessage);
      // navigate(`/payment/${unbookedseat.data.successMessage._id}`);
      // setSummary(false);
      // navigate("/");
    } catch (error) {
      message.error(error.response.data.errorMessage);
      console.log(error.response.data.errorMessage);
    }
  };

  const onBackTicket = async () => {
    setSummary(false);
  };

  const gotosummary = async () => {
    try {
      const ticketDetails = {
        seat: temSeat,
        movieTitle: showdata.title,
        date: showdata.datetime,
        price: price,
        username: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        showid: showdata._id,
      };
      const unbookedseat = await axios.post(
        "/ticket/checkticket",
        ticketDetails
      );
      setGrandTotal(price + ((price * 3) / 100 + (price * 15) / 100));
      console.log("unbooked seat is " + unbookedseat.data.successMessage);
      setUnbooked(unbookedseat.data.successMessage);
      setSummary(true);
    } catch (error) {
      console.log("error + ", error.response.data.errorMessage);
    }
  };

  const handlePromocodeStatus = (data) => {
    console.log("seleceted promo is " + JSON.stringify(data));
    console.log("selected type is " + JSON.stringify(data.promocode_type));
    console.log("selected discount is " + JSON.stringify(data.discount));
    if (promoName === data.promo_name) {
      console.log("active status is " + applyStatus);
      setApplyStatus(false);
      setValue("promo_name", "");
      console.log(
        "grand total is " + (price + ((price * 3) / 100 + (price * 15) / 100))
      );
      setGrandTotal(price + ((price * 3) / 100 + (price * 15) / 100));
      setPromoId(null);
      setPromocodeType(null);
      setDiscount(null);
      setPromoDiscount(null);
      setPromoExpiry_Date(null);
      setPromoLimit(null);
      setPromoActive_Status(null);
      setPromoName("");
    } else {
      console.log("promo is " + data.promo_name);
      console.log("active status is " + applyStatus);
      setApplyStatus(true);
      setPromocodeType(data.promocode_type);
      setPromoId(data._id);
      setValue("promo_name", data.promo_name);
      setPromoName(data.promo_name);
      setPromoDiscount(data.discount);
      setPromoExpiry_Date(data.expiry_date);
      setPromoLimit(data.limit);
      setPromoActive_Status(data.active_status);
      if (data.promocode_type === "Flat") {
        const gh = price - data.discount;
        if (gh <= 0) {
          console.log(
            "grand total is " + ((price * 3) / 100 + (price * 15) / 100)
          );
          setGrandTotal((price * 3) / 100 + (price * 15) / 100);
        } else {
          console.log(
            "grand total is " + (gh + ((price * 3) / 100 + (price * 15) / 100))
          );
          setGrandTotal(gh + ((price * 3) / 100 + (price * 15) / 100));
        }
        setDiscount(data.discount);
      } else {
        let discount = (price * data.discount) / 100;
        setDiscount(discount);
        let perprice =
          price - discount + ((price * 3) / 100 + (price * 15) / 100);
        setGrandTotal(perprice);
      }
    }
  };

  const onCross = () => {
    console.log("cross clicked");
    setApplyStatus(false);
    setValue("promo_name", "");
    setGrandTotal(price + ((price * 3) / 100 + (price * 15) / 100));
  };

  return (
    <>
      {showdata && !summary && (
        <>
          <div id="bookticket">
            <div className="row bg-dark text-white ">
              <div className="col-sm-1">
                <button
                  className="mt-3 btn pointer-link"
                  onClick={() => onBack()}
                >
                  &#60;- Back
                </button>
              </div>

              <div className="col-sm-10 ml-4">
                <h5>{showdata.title}</h5>
                <p>
                  Inox Cinema - NADIAD |{" "}
                  <span>{moment(showdata.datetime).format("llll")}</span>
                </p>
              </div>
            </div>
            <div className="container">
              <div
                id="pay"
                className="align-bottom d-flex justify-content-left"
              >
                {price !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => gotosummary()}
                  >
                    {price == 0 ? "" : "Pay : " + price}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2"></div>
              <div>
                <br />
                <div>
                  <table>
                    <tfoot>
                      <tr className=" mt-1">
                        <td colSpan="9">EXCLUSIVE Rs. 120.0</td>
                      </tr>
                      {seatRow.slice(0, 3).map((seatRowAlphabet) => {
                        return (
                          <tr key={seatRowAlphabet}>
                            <SeatCom
                              key={seatRowAlphabet}
                              value={seatRowAlphabet}
                              seatArray={seat}
                              qseats={temSeat}
                              onHandleSeat={handleSeat}
                              selectedSeat={selectedSeat}
                            />
                          </tr>
                        );
                      })}

                      <hr />
                      <tr className="mt-1">
                        <td colSpan="9">PREMIUM Rs. 150.0</td>
                      </tr>

                      {seatRow.slice(3, 9).map((seatRowAlphabet) => {
                        return (
                          <tr key={seatRowAlphabet}>
                            <SeatCom
                              key={seatRowAlphabet}
                              value={seatRowAlphabet}
                              seatArray={seat}
                              qseats={temSeat}
                              onHandleSeat={handleSeat}
                              selectedSeat={selectedSeat}
                            />
                          </tr>
                        );
                      })}
                      <hr />
                      <tr>
                        <td colSpan="9" className="mt-1">
                          Golden Rs. 180.0
                        </td>
                      </tr>
                      {seatRow.slice(9).map((seatRowAlphabet) => {
                        return (
                          <tr key={seatRowAlphabet}>
                            <SeatCom
                              key={seatRowAlphabet}
                              value={seatRowAlphabet}
                              seatArray={seat}
                              qseats={temSeat}
                              onHandleSeat={handleSeat}
                              selectedSeat={selectedSeat}
                            />
                          </tr>
                        );
                      })}
                    </tfoot>
                  </table>
                </div>
                <div className="mt-5">
                  <img
                    id="screenimage"
                    className="rounded mx-auto d-block d-flex justify-content-center"
                    src="/images/screen.png"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {summary && showdata && promocodeList && (
        <>
          <div>
            <div className="d-flex justify-content-center mt-4">
              <Card className="bg-light" style={{ width: 450 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 18 }}
                    component="div"
                    className="d-flex justify-content-center"
                  >
                    B O O K I N G &nbsp; S U M M A R Y
                  </Typography>
                  <div className="ml-4 mr-2 mt-4 d-flex justify-content-between">
                    <span style={{ overflowWrap: "break-word" }}>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        {unBookedSeat + " "}
                        {`(${unBookedSeat.length}Tickets)`}
                      </Typography>
                    </span>
                    <span>
                      <Typography sx={{ fontSize: 14 }}>
                        Rs. {price}.00
                      </Typography>
                    </span>
                  </div>

                  <div>
                    <Typography>
                      <div className="ml-4 mr-2 d-flex justify-content-between">
                        {applyStatus === true ? (
                          <>
                            <span>Discount</span>
                            <span>- Rs. {discount} </span>
                          </>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </Typography>
                  </div>

                  <div className="ml-4 mr-2 d-flex justify-content-between">
                    <span>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {elementVisible ? (
                          <span
                            onClick={() => setElementVisible(!elementVisible)}
                          >
                            <FaAngleUp />
                          </span>
                        ) : (
                          ""
                        )}
                        {!elementVisible ? (
                          <span
                            onClick={() => setElementVisible(!elementVisible)}
                          >
                            <FaAngleDown />
                          </span>
                        ) : (
                          ""
                        )}
                        <span style={{ fontSize: 15 }}>Convenience fees</span>
                      </Typography>
                    </span>
                    <span>Rs. {(price * 3) / 100 + (price * 15) / 100}</span>
                  </div>

                  {elementVisible ? (
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                      <div className="mr-2">
                        <div className="ml-4 d-flex justify-content-between">
                          <span>Base Amount </span>
                          <span>Rs. {(price * 3) / 100}</span>
                        </div>
                        <div className="ml-4 d-flex justify-content-between">
                          <span>Integrated GST </span>
                          <span>Rs. {(price * 15) / 100}</span>
                        </div>
                      </div>
                    </Typography>
                  ) : (
                    " "
                  )}

                  <Divider
                    className="ml-4 mt-3 mb-3 mr-2"
                    sx={{ borderStyle: "dashed" }}
                  />
                  <Typography>
                    <div className="ml-4 d-flex justify-content-between"></div>
                    <div className="ml-4 d-flex justify-content-between">
                      <span> Grand Total </span>

                      <span className="mr-2">Rs. {grandTotal}</span>
                    </div>
                  </Typography>

                  <div className="ml-4 d-flex justify-content-between">
                    <span>
                      <label htmlFor="promo_name">
                        Apply Promocode : &nbsp;
                      </label>
                    </span>

                    <span>
                      <input
                        className="mr-2 bg-light border border-black"
                        type="text"
                        onChange={(e) => handlePromocodeStatus(e)}
                        {...register("promo_name")}
                      />
                      <RxCross2 onClick={() => onCross()} />
                    </span>
                  </div>
                  <div className="mt-4 ml-4 mb-2">
                    <Typography sx={{ fontSize: 14 }}>PROMO CODES</Typography>
                  </div>

                  <div className="mb-4 ml-4">
                    <List
                      sx={{
                        width: "100%",
                        overflow: "auto",
                        maxHeight: 150,
                        bgcolor: "background.gray",
                        position: "relative",
                      }}
                    >
                      {promocodeList &&
                        promocodeList.map((data) => {
                          return (
                            <ListItem disablePadding>
                              <MdDiscount className="mr-2" />
                              <ListItemText
                                primary={data.promo_name}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      Get {data.discount}{" "}
                                      {data.promocode_type === "Flat"
                                        ? "₹ Flat"
                                        : "%"}{" "}
                                      OFF
                                    </Typography>
                                  </React.Fragment>
                                }
                              />

                              {promoName === data.promo_name &&
                              applyStatus === true ? (
                                <Button
                                  color="error"
                                  onClick={() => handlePromocodeStatus(data)}
                                >
                                  Remove
                                </Button>
                              ) : (
                                <Button
                                  color="primary"
                                  onClick={() => handlePromocodeStatus(data)}
                                >
                                  Apply
                                </Button>
                              )}
                            </ListItem>
                          );
                        })}
                    </List>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      style={{ width: 300, background: "#ADD8E6" }}
                      type="button"
                      className="ml-4 btn "
                      onClick={() => onPay()}
                    >
                      Pay Rs.{grandTotal}
                    </button>
                  </div>

                  <div>
                    <button
                      className="mt-3 btn pointer-link bg-light"
                      onClick={() => onBackTicket()}
                    >
                      &#60;- Back
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookTicket;
