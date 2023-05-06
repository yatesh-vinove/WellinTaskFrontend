import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login/index";
import { useForm } from "react-hook-form";
import routeNames from "../../../routes/routeNames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ISigninPayload {
  username: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is Required")
      .min(6, "Username should be 6 characters long"),
    password: yup
      .string()
      .required("Password is Required")
      .min(8, "Password should be atleast 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
        "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character"
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ISigninPayload>({ resolver: yupResolver(validationSchema) });

  const handleSubmitData = async (data: ISigninPayload) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (result.status === 201) {
        navigate(routeNames.USERLIST);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Oops Something Went Wrong!!");
    }
  };
  const onSubmit = async (data: any) => handleSubmitData(data);

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name"
                  {...register("username")}
                />
                {errors.username && (
                  <span style={{ color: "red" }}>
                    {errors.username?.message}
                  </span>
                )}
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text">Register Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <div className="mt-3">
                <Link to={"/"}>Have Account, Sign In</Link>
              </div>
            </form>
          </div>

          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}
