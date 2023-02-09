import React, { useEffect, useState } from "react";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [allMovie, setAllMovie] = useState([]);
  const [message, setMessage] = useState("");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
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
    getRecords();
  }, [value]);

  const getRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(sort[value].sortedby);
      const movieData = await axios.get(
        `http://localhost:8080/movie?sortedby=${sort[value].sortedby}&title=${message}`,
        {
          headers: { Authorization: token },
        }
      );
      setAllMovie(movieData.data.successMessage);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlerClick = () => {
    console.log(message);
    setMessage(message);
    getRecords();
  };

  const handleonChange = (event) => {
    setMessage(event.target.value);
  };

  const handleDetails = (data) => {
    console.log(data);
    localStorage.setItem("title", data.title);
    navigate("/moviedetails", {
      state: {
        movie: data,
      },
    });
  };

  const handleAddMovie = () => {
    console.log("handleAddMovie");
    navigate("/addmovie");
  };
  return (
    <>
      <Layout>
        <body>
          <div classaName="row inline-block">
            <div classaName="row">
              <h3 className="col-md-6">Recomanded Movies</h3>
              <input
                type="text"
                placeholder="Search here"
                name="message"
                onChange={handleonChange}
                value={message}
              />
              <button onClick={handlerClick}>Search</button>
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

          <div className="row">
            {allMovie.map((data) => {
              return (
                <div key={data.title} className="col-md-3">
                  <button onClick={() => handleDetails(data)}>
                    <img src={data.poster_api} alt="image not avaliable" />
                  </button>
                  <div className="font-weight-bold">{data.title}</div>
                  <div className="mb-3">{data.movie_type}</div>
                </div>
              );
            })}
          </div>
          <div>
            {role === "admin" && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddMovie()}
              >
                Add
              </button>
            )}
          </div>
        </body>
      </Layout>
    </>
  );
};

export default HomePage;
