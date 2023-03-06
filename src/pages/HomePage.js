import React, { useEffect, useState } from "react";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage, setHeader } from "./Utils";

const HomePage = () => {
  const [allMovie, setAllMovie] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");

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
  const [sortValue, setSortValue] = useState(sort.Asc_created.text);
  useEffect(() => {
    console.log("from homepage " + localStorage.getItem("token"));
    getRecords();
  }, [sortValue, movieTitle]);

  const getRecords = async () => {
    try {
      setHeader(localStorage.getItem("token"));
      console.log(sort[sortValue].sortedby);
      const movieData = await axios.get(
        `/movie?sortedby=${sort[sortValue].sortedby}&title=${movieTitle}`
      );
      setAllMovie(movieData.data.successMessage);
    } catch (error) {
      console.log(error);
      clearStorage();
      //navigate("/login");
    }
  };
  const onSortingChange = (event) => {
    setSortValue(event.target.value);
  };

  const handlerSearchButton = () => {
    console.log(movieTitle);
    setMovieTitle(movieTitle);
    getRecords();
  };

  const onSearchChange = (event) => {
    setMovieTitle(event.target.value);
  };

  const handleImageClickDetails = (data) => {
    localStorage.setItem("title", data.title);
    console.log("on image clicked " + data);
    navigate(`/moviedetails/${data.title}`);
  };

  const handleAddButton = () => {
    console.log("handleAddMovie");
    navigate("/addmovie");
  };
  return (
    <>
      <Layout>
        <body>
          <div className="mt-4 mb-5">
            <div className="row">
              <div className="col-sm-4 form-row">
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search here"
                    name="message"
                    onChange={onSearchChange}
                    value={movieTitle}
                  />
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-primary"
                    onClick={handlerSearchButton}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="col-sm-5 d-flex">
                <select onChange={onSortingChange}>
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
              <div className="col-sm-3 d-flex justify-content-end">
                {role === "admin" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleAddButton()}
                  >
                    Add Movie
                  </button>
                )}
              </div>
            </div>
          </div>

          <h3>Recomanded Movies</h3>
          <div className="row">
            {allMovie.map((data) => {
              return (
                <div key={data.title} className="col-md-3">
                  <button onClick={() => handleImageClickDetails(data)}>
                    <img src={data.poster_api} alt="image not avaliable" />
                  </button>
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
