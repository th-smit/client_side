import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EditMovieDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("helllll");
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (location.state === null) {
      navigate("/");
    } else {
      setValue("title", location.state.movieData.title);
      setValue("description", location.state.movieData.description);
      setValue("movie_type", location.state.movieData.movie_type);
      setValue("poster_api", location.state.movieData.poster_api);
      setValue("is_released", location.state.movieData.is_released);
    }
  }, []);

  const onEditMovieDetailSubmit = async (values) => {
    try {
      console.log(location.state.movieData._id);
      console.log(values);
      const newUserData = await axios.put(
        `http://localhost:8080/movie/${location.state.movieData._id}`,
        values
      );
      console.log(newUserData);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onEditMovieDetailSubmit)}>
        <h3 className="title">Edit Movie Details</h3>
        <label htmlFor="title">Movie Title : &nbsp;</label>
        <input
          type="text"
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
        />
        <p>
          {errors.title && (
            <span style={{ color: "red" }}>
              title is mandatory, must be length between 3-100{" "}
            </span>
          )}
        </p>

        <label htmlFor="description">Description : &nbsp;</label>
        <textarea
          type="text"
          {...register("description", {
            required: true,
            minLength: 3,
            maxLength: 5000,
          })}
        />
        <p>
          {errors.description && (
            <span style={{ color: "red" }}>
              description is mandatory, must be length between 3-5000{" "}
            </span>
          )}
        </p>

        <label htmlFor="poster_api">Poster_API : &nbsp;</label>
        <input
          type="text"
          {...register("poster_api", {
            required: true,
          })}
        />
        <p>
          {errors.poster_api && (
            <span style={{ color: "red" }}>poster_api is mandatory</span>
          )}
        </p>

        <label htmlFor="movie_type">Movie Type : &nbsp;</label>
        <input
          type="text"
          {...register("movie_type", {
            required: true,
            minLength: 4,
            maxLength: 50,
          })}
        />
        <p>
          {errors.movie_type && (
            <span style={{ color: "red" }}>
              Movie type is mandatory must be length between 4-50{" "}
            </span>
          )}
        </p>
        <div>
          <label htmlFor="is_released">Is_Released ? &nbsp;</label>
          <input type="checkbox" {...register("is_released")}></input>
        </div>
        <input type="submit" className="btn btn-primary" value="Update" />
      </form>
    </>
  );
};

export default EditMovieDetails;
