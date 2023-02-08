import React from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddMovie() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const form = useForm({
    defaultValues: {
      checkbox: false,
    },
  });
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const newUserData = await axios.post(
        "http://localhost:8080/movie",
        values
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="title">Add Movies</h3>
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

        <label htmlFor="is_released">Is_Released ? &nbsp;</label>
        <input type="checkbox" {...register("is_released")}></input>

        <input type="submit" className="btn btn-primary" />
      </form>
    </>
  );
}
export default AddMovie;
