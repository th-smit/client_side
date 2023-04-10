import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Layout from "../component/Layout.js/Layout";
import { Chart, ArcElement } from "chart.js/auto";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

Chart.register(ArcElement);

const Report = () => {
  const [highestTimeUsedPC, setHighestTimeUsedPC] = useState([]);
  const [highestTimeUsedPCCount, setHighestTimeUsedPCCount] = useState();

  const [moviesPromos, getMoviesPromos] = useState();

  const [mpc, setMpc] = useState();
  const [savingData, setSavingData] = useState();

  // let userEmail = [];
  // let totalSaving = [];

  const [pl, setPl] = useState([]);
  const [ptl, setPtl] = useState([]);

  const [userName, setUserName] = useState([]);
  const [limit, setLimit] = useState([]);

  // let userName = [];
  // let limit = [];

  const [userEmail, setUserEmail] = useState([]);
  const [totalSaving, setTotalSaving] = useState([]);

  // const [pieLabels, setPieLabels] = useState([]);
  // const [pieTotalLimit, setPieTotalLimit] = useState([]);

  // const data = {
  //   labels: ["r", "b"],
  //   datasets: [
  //     {
  //       data: pieTotalLimit,
  //       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //       hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //     },
  //   ],
  // };

  useEffect(() => {
    getPCNameHighestTimeUsed();
    getUserNameHighestTimeUsedPC();
    getMoviePromo();
    getSaving();
  }, []);

  useEffect(() => {
    console.log("chart displayed");
    const ctx = document.getElementById("PieChart");
    const PieChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: pl,
        datasets: [
          {
            data: ptl,
            label: ` of Votes`,
            borderWidth: 1,
          },
        ],
      },
    });

    return () => {
      PieChart.destroy();
    };
  }, [pl, ptl]);

  useEffect(() => {
    const ctx = document.getElementById("BarChart");
    const BarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: userName,
        datasets: [
          {
            data: limit,
            label: ` Display How Many Times User Used the Promo Code `,
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
          },
        ],
      },
    });

    return () => {
      BarChart.destroy();
    };
  }, [userName, limit]);

  useEffect(() => {
    const ctx = document.getElementById("Bar1Chart");
    const Bar1Chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: userEmail,
        datasets: [
          {
            data: totalSaving,
            label: ` Display How Many Times User Used the Promo Code `,
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
          },
        ],
      },
    });

    return () => {
      Bar1Chart.destroy();
    };
  }, [userEmail, totalSaving]);

  const getPCNameHighestTimeUsed = async () => {
    try {
      const UserPromoData = await axios.get("/promocode/getuserpromodata");
      console.log(UserPromoData.data.successMessage);
      setHighestTimeUsedPCCount(
        UserPromoData.data.successMessage[0].totalLimit
      );
      console.log("hello " + JSON.stringify(UserPromoData.data.successMessage));
      setHighestTimeUsedPC(UserPromoData.data.successMessage);

      UserPromoData.data.successMessage.map((data) => {
        // pl.push(data._id);
        console.log("promo name " + data._id);

        setPl((pl) => [...pl, data._id]);
        // ptl.push(data.totalLimit);
        setPtl((ptl) => [...ptl, data.totalLimit]);
      });
      // setPl(pl1);
      // setPtl(ptl1);
    } catch (error) {
      console.log("error in fetching data from the promocode " + error);
      console.log("hello");
    }
  };

  const getUserNameHighestTimeUsedPC = async () => {
    try {
      const UserNames = await axios.get(
        "/promocode/getUserNameHighestTimeUsedPC"
      );

      UserNames.data.successMessage.map((data) => {
        console.log("user name is " + data.userName[0]);
        setUserName((userName) => [...userName, data.userName[0]]);
        setLimit((limit) => [...limit, data.totalLimit]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSaving = async () => {
    try {
      const saving = await axios.get("/promocode/getsaving");
      console.log("saving data  " + JSON.stringify(saving.data.successMessage));
      setSavingData(saving.data.successMessage);

      saving.data.successMessage.map((data) => {
        setUserEmail((userName) => [...userName, data._id]);
        setTotalSaving((totalSaving) => [...totalSaving, data.totalSaving]);
      });

      console.log("userEmail array is " + userEmail);
      console.log("totalSaving array is " + totalSaving);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoviePromo = async () => {
    try {
      console.log("movie promo data1");
      const moviepromo = await axios.get("/promocode/getmoviepromo");
      console.log(
        "movie promo data2" + JSON.stringify(moviepromo.data.successMessage)
      );

      const mergedPromocodes = {};

      moviepromo.data.successMessage.forEach((doc) => {
        const { promoname, movie_title } = doc;
        if (mergedPromocodes[movie_title]) {
          mergedPromocodes[movie_title] += "," + promoname;
        } else {
          mergedPromocodes[movie_title] = promoname;
        }
      });

      console.log("merged promo is " + JSON.stringify(mergedPromocodes));

      const result = Object.entries(mergedPromocodes).map(([key, value]) => ({
        movieName: key,
        promoCodes: value.split(","),
      }));

      console.log("resultant is " + JSON.stringify(result));
      setMpc(result);
      getMoviesPromos(moviepromo.data.successMessage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {/* <span style={{ width: "300px" }}>
        <Pie data={data} />
      </span> */}
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
                <canvas id="PieChart"></canvas>
              </div>
            </>
          )}
          <div className="col-md-6">
            <div>
              Highest Time Used Promo :{" "}
              <span className="mb-3">
                {highestTimeUsedPC.map((data) => {
                  if (data.totalLimit === highestTimeUsedPCCount) {
                    return <span key={data._id}>{data._id + " "}</span>;
                  }
                })}
              </span>
              <br />
              <span>
                Total Number of Promo <span>{highestTimeUsedPC.length}</span>
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
                    secondaryAction={<React.Fragment>{"Times"}</React.Fragment>}
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
          <p>{userName}</p>
          <p>{limit}</p>
          {userName && limit && (
            <div style={{ width: "80%", margin: "auto" }}>
              <canvas id="BarChart"></canvas>
            </div>
          )}
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
          {/* <List
            sx={{
              width: "70%",
              overflow: "auto",
              maxHeight: 300,
              bgcolor: "background.gray",
              position: "relative",
            }}
          >
            {moviesPromos && (
              <ListItem
                disablePadding
                secondaryAction={
                  <React.Fragment>{"Promo Codes"}</React.Fragment>
                }
              >
                <ListItemText primary={"Movie Name"} />
              </ListItem>
            )}

            {moviesPromos &&
              moviesPromos.map((data) => {
                return (
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <React.Fragment>{data.promoname}</React.Fragment>
                    }
                  >
                    <ListItemText primary={data._id} />
                  </ListItem>
                );
              })}
          </List> */}

          <div className="row">
            {/* <p>{mpc}</p> */}
            {mpc && (
              <p>
                {mpc.map((data) => {
                  return (
                    <>
                      <span>{data.movieName + " - "}</span>

                      <span>{data.promoCodes.join(", ")}</span>
                      <br />
                    </>
                  );
                })}
              </p>
            )}
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
          <p>{userEmail}</p>
          <p>{totalSaving}</p>
          {userEmail && totalSaving && (
            <div style={{ width: "80%", margin: "auto" }}>
              <canvas id="Bar1Chart"></canvas>
            </div>
          )}
        </div>
      </>
    </Layout>
  );
};

export default Report;
