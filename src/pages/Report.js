import React, { useEffect, useState } from "react";
import axios from "axios";

import Chart from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import Layout from "../component/Layout.js/Layout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TfiMoreAlt } from "react-icons/tfi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Box from "@mui/material/Box";

const Report = () => {
  const [highestTimeUsedPC, setHighestTimeUsedPC] = useState([]);
  const [highestTimeUsedPCCount, setHighestTimeUsedPCCount] = useState();

  const [mpc, setMpc] = useState();

  const [pl, setPl] = useState([]);
  const [ptl, setPtl] = useState([]);

  const [userName, setUserName] = useState([]);
  const [limit, setLimit] = useState([]);

  const [userEmail, setUserEmail] = useState([]);
  const [totalSaving, setTotalSaving] = useState([]);

  const [status, setStatus] = useState(false);

  const [pieData, setPieData] = useState();
  const [bar1Data, setBar1Data] = useState();
  const [bar2Data, setBar2Data] = useState();

  useEffect(() => {
    getPCNameHighestTimeUsed();
    getUserNameHighestTimeUsedPC();
    getMoviePromo();
    getSaving();
  }, []);

  useEffect(() => {
    if (pl.length !== 0) {
      const data = {
        labels: pl,
        datasets: [
          {
            label: "# of Votes",
            data: ptl,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setPieData(data);
    }
  }, [pl, ptl, status]);

  useEffect(() => {
    if (userName.length !== 0) {
      const data = {
        labels: userName,
        datasets: [
          {
            label: "Dataset 2",
            data: limit,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setBar2Data(data);
    }
  }, [userName, limit, status]);

  useEffect(() => {
    if (userEmail.length !== 0) {
      const data = {
        labels: userEmail,
        datasets: [
          {
            label: "Dataset 1",
            data: totalSaving,
            backgroundColor: [
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setBar1Data(data);
    }
  }, [userEmail, totalSaving, status]);

  const getPCNameHighestTimeUsed = async () => {
    if (pl.length === 0) {
      try {
        const UserPromoData = await axios.get("/promocode/getuserpromodata");
        setHighestTimeUsedPCCount(
          UserPromoData.data.successMessage[0].totalLimit
        );
        setHighestTimeUsedPC(UserPromoData.data.successMessage);

        UserPromoData.data.successMessage.map((data) => {
          console.log("promo name " + data._id);
          setPl((pl) => [...pl, data._id]);
          setPtl((ptl) => [...ptl, data.totalLimit]);
        });
      } catch (error) {
        console.log("error in fetching data from the promocode " + error);
      }
    }
  };

  const getUserNameHighestTimeUsedPC = async () => {
    if (userName.length === 0) {
      try {
        const UserNames = await axios.get(
          "/promocode/getUserNameHighestTimeUsedPC"
        );

        UserNames.data.successMessage.map((data) => {
          setUserName((userName) => [...userName, data.userName[0]]);
          setLimit((limit) => [...limit, data.totalLimit]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getSaving = async () => {
    if (userName.length === 0) {
      try {
        const saving = await axios.get("/promocode/getsaving");

        saving.data.successMessage.map((data) => {
          setUserEmail((userName) => [...userName, data._id]);
          setTotalSaving((totalSaving) => [...totalSaving, data.totalSaving]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMoviePromo = async () => {
    try {
      const moviepromo = await axios.get("/promocode/getmoviepromo");
      const mergedPromocodes = {};

      moviepromo.data.successMessage.forEach((doc) => {
        const { promoname, movie_title } = doc;
        if (mergedPromocodes[movie_title]) {
          mergedPromocodes[movie_title] += "," + promoname;
        } else {
          mergedPromocodes[movie_title] = promoname;
        }
      });
      const result = Object.entries(mergedPromocodes).map(([key, value]) => ({
        movieName: key,
        promoCodes: value.split(","),
      }));

      result.slice(0, 2);
      setMpc(result);
    } catch (error) {
      console.log(error);
    }
  };

  const viewdetails = () => {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  return (
    <Layout>
      <>
        {!status && (
          <>
            <div
              className="row mt-4 "
              style={{
                backgroundColor: "#dcf7fc",
                padding: "30px",
                width: "80%",
                margin: "auto",
              }}
            >
              {pl && ptl && (
                <>
                  <div
                    style={{ width: "300px", height: "300px" }}
                    className="col-md-6 w-25"
                  >
                    {pieData && <Pie data={pieData} />}
                  </div>
                </>
              )}
              <div className="col-md-6">
                <div>
                  <span>Highest Time Used Promo : </span>
                  <span className="mb-1">
                    {highestTimeUsedPC.map((data) => {
                      if (data.totalLimit === highestTimeUsedPCCount) {
                        return <span key={data._id}>{data._id + " "}</span>;
                      }
                    })}
                  </span>

                  <br />
                  <span>
                    Total Number of Promo{" "}
                    <span>{highestTimeUsedPC.length}</span>
                  </span>
                  <br />
                </div>
                <div className="mt-2">
                  <List
                    sx={{
                      width: "70%",
                      overflow: "auto",
                      maxHeight: 300,
                      bgcolor: "background.gray",
                      position: "relative",
                    }}
                  >
                    {highestTimeUsedPC && (
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <React.Fragment>{"Times"}</React.Fragment>
                        }
                      >
                        <ListItemText primary={"Promo Codes"} />
                      </ListItem>
                    )}

                    {highestTimeUsedPC &&
                      highestTimeUsedPC.map((data) => {
                        return (
                          <ListItem
                            disablePadding
                            secondaryAction={
                              <React.Fragment>{data.totalLimit}</React.Fragment>
                            }
                          >
                            <ListItemText primary={data._id} />
                          </ListItem>
                        );
                      })}
                  </List>
                </div>
              </div>
            </div>

            <div
              className="row mt-4"
              style={{
                backgroundColor: "#dcf7fc",
                padding: "30px",
                width: "80%",
                margin: "auto",
              }}
            >
              <div className="mb-3" style={{ width: "80%", margin: "auto" }}>
                how much amount the users saved using the promo codes
              </div>

              {/* <Bar
                data={{
                  labels: [1, 2, 3, 4],
                  datasets: [
                    {
                      label: "Promo Use",
                      data: [],
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={options}
              /> */}
              {userName && limit && (
                <div style={{ width: "80%", margin: "auto" }}>
                  {bar1Data && <Bar data={bar1Data} />}
                </div>
              )}
            </div>
            <div
              className="mt-4"
              style={{
                backgroundColor: "#dcf7fc",
                padding: "30px",
                width: "80%",
                margin: "auto",
              }}
            >
              <div className="mb-3">
                Which movie has the highest booking with which promo
              </div>
              <div className="">
                <Box sx={{ boxShadow: 3 }}>
                  <TableContainer component={Paper} className="">
                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                      <TableHead sx={{ maxWidth: 550 }}>
                        <TableRow>
                          <TableCell>Movie Name</TableCell>
                          <TableCell align="right">Promo Codes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mpc &&
                          mpc.map((data) => {
                            return (
                              <TableRow
                                key={data.movieName}
                                scope="row"
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {data.movieName}
                                </TableCell>
                                <TableCell align="right">
                                  {data.promoCodes.join(",")}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        <TableRow
                          key={1}
                          scope="row"
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <button
                              // style={{ backgroundColor: "#dcf7fc" }}
                              onClick={viewdetails}
                            >
                              <TfiMoreAlt />
                            </button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </div>
            </div>
            <div
              className="row mt-4 mb-4"
              style={{
                backgroundColor: "#dcf7fc",
                padding: "30px",
                width: "80%",
                margin: "auto",
              }}
            >
              <div className="mb-3" style={{ width: "80%", margin: "auto" }}>
                Highest times which user uses promo code
              </div>
              {userEmail && totalSaving && (
                <div style={{ width: "80%", margin: "auto" }}>
                  {bar2Data && <Bar data={bar2Data} />}
                </div>
              )}
            </div>
          </>
        )}
        {status && (
          <div className="container">
            <div>
              <button onClick={viewdetails} className="mt-2 mb-2">
                <MdOutlineArrowBackIosNew /> Back
              </button>
            </div>
            <div className="">
              <Box sx={{ boxShadow: 3 }}>
                <TableContainer component={Paper} className="">
                  <Table sx={{ minWidth: 150 }} aria-label="simple table">
                    <TableHead sx={{ maxWidth: 550 }}>
                      <TableRow>
                        <TableCell>Movie Name</TableCell>
                        <TableCell align="right">Promo Codes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mpc &&
                        mpc.map((data) => {
                          return (
                            <TableRow
                              key={data.movieName}
                              scope="row"
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {data.movieName}
                              </TableCell>
                              <TableCell align="right">
                                {data.promoCodes.join(",")}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Report;
