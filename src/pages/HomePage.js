import React, { useEffect, useState } from "react";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";

const HomePage = () => {
  const [allMovie, setAllMovie] = useState([]);
  useEffect(() => {
    const getRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const movieData = await axios.get("http://localhost:8080/movie", {
          headers: { Authorization: token },
        });
        setAllMovie(movieData.data.successMessage);
      } catch (error) {
        console.log(error);
      }
    };
    getRecords();
  }, []);

  return (
    <>
      <Layout>
        <h1>Movie List</h1>
        <div className="row">
          <div className="col-3">
            {allMovie.map((data) => {
              return (
                <div key={data.title}>
                  <img
                    src={
                      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pathaan-et00323848-1674372556.jpg"
                    }
                  />
                  <div>{data.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
