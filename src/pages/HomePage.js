import React, { useEffect, useState } from "react";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const SECRET_KEY = "SECRET";

const HomePage = () => {
  const [allMovie, setAllMovie] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const getRecords = async () => {
      try {
        console.log(location.state.token);
        const movieData = await axios.get("http://localhost:8080/movie");
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
        <div>
          {allMovie.map((data) => {
            return <div key={data.title}>{data.title}</div>;
          })}
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
