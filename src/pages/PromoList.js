import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Layout from "../component/Layout.js/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";
import Badge from "@mui/material/Badge";

const PromoList = () => {
  const [promoRecord, setPromoRecord] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/login");
    // }
    getPromoRecords();
  }, []);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const getPromoRecords = async () => {
    console.log("promo code is ");
    const promoRecord = await axios.get(`/promocode`);
    console.log(promoRecord.data.successMessage);
    setPromoRecord(promoRecord.data.successMessage);
  };

  const handleEditShowDetails = (data) => {
    console.log(data);
    navigate(`/editpromo/${data._id}`);
  };

  const handleDeleteShowDetails = async (data) => {
    console.log(data.promo_name);
    axios.delete(`/promocode/${data.promo_name}`);
    navigate(-1);
  };
  const onBack = async () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div>
        <div className="mb-2 mt-2">
          <button
            className="btn btn-primary pointer-link"
            onClick={() => onBack()}
          >
            &#60;- Back
          </button>
        </div>
        <h4>PromoCodes</h4>
        <div className="row">
          {promoRecord &&
            promoRecord.map((data) => {
              return (
                <div className="mb-3 col-md-4">
                  <Card sx={{ minWidth: 20 }}>
                    <CardContent>
                      <div className="d-flex justify-content-between">
                        <span>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {data.discount}
                            {data.promocode_type === "Flat"
                              ? "₹ Flat"
                              : "%"}{" "}
                            OFF
                          </Typography>
                        </span>
                        <span>
                          <FiEdit2
                            onClick={() => handleEditShowDetails(data)}
                          />
                          <MdDelete
                            onClick={() => {
                              const confirmBox = window.confirm(
                                "Do you Really want to delete this show?"
                              );
                              if (confirmBox === true) {
                                handleDeleteShowDetails(data);
                              }
                            }}
                          />
                        </span>
                      </div>
                      <span style={{ overflowWrap: "break-word" }}>
                        <Typography variant="h5" component="div">
                          USE PROMO : {data.promo_name}
                        </Typography>
                      </span>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Expire On : {moment(data.expiry_date).format("ll")}
                      </Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                        {data.active_status}
                        <span>
                          Active Status {"  "}&nbsp;
                          {data.active_status ? (
                            <Badge
                              color="success"
                              overlap="circular"
                              badgeContent=" "
                              variant="dot"
                            ></Badge>
                          ) : (
                            <Badge
                              color="error"
                              overlap="circular"
                              badgeContent=" "
                              variant="dot"
                            ></Badge>
                          )}
                        </span>
                      </Typography>
                      <Typography variant="body2">
                        Available For : {" " + data.movies + " "}
                        <br />
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default PromoList;
