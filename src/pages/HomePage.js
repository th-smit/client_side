import React, { useEffect, useState } from "react";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";

const HomePage = () => {
  const [allMovie, setAllMovie] = useState([]);
  const sort = {
    Asc_created: {
      sortedby: "createdAt",
      text: "Asc_created",
    },
    Asc_updated: {
      sortedby: "updatedAt",
      text: "Asc_updated",
    },
    Des_created: {
      sortedby: "-createdAt",
      text: "Des_created",
    },
    Des_updated: {
      sortedby: "-updatedAt",
      text: "Des_updated",
    },
  };
  const [value, setValue] = useState(sort.Asc_created.text);
  useEffect(() => {
    const getRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(sort[value]);
        const movieData = await axios.get(
          `http://localhost:8080/movie?sortedby=${sort[value].sortedby}`,
          {
            headers: { Authorization: token },
          }
        );
        setAllMovie(movieData.data.successMessage);
      } catch (error) {
        console.log(error);
      }
    };
    getRecords();
  }, [value]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Layout>
        <div classaName="row inline-block">
          <div classaName="row">
            <h3 className="col-md-6">Recomanded Movies</h3>
            <div className="col-md-6 ml-0">
              <select onChange={handleChange}>
                <option value={sort.Asc_created.text}>
                  {sort.Asc_created.text}
                </option>
                <option value={sort.Asc_updated.text}>
                  {sort.Asc_updated.text}
                </option>
                <option value={sort.Des_created.text}>
                  {sort.Des_created.text}
                </option>
                <option value={sort.Des_updated.text}>
                  {sort.Des_updated.text}
                </option>
              </select>
            </div>
          </div>
        </div>
        <body>
          <div className="row">
            {allMovie.map((data) => {
              return (
                <div key={data.title} className="col-md-3">
                  <img src={data.poster_api} alt="image not avaliable" />
                  <div className="font-weight-bold">{data.title}</div>
                  <div className="mb-3">{data.movie_type}</div>
                </div>
              );
            })}
          </div>
        </body>
      </Layout>
    </>
  );
};

export default HomePage;
