import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import "./index.css";
import routeNames from "../../../routes/routeNames";

interface ISigninPayload {
  username: string;
  password: string;
}
export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISigninPayload>();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = Cookies.get("access_token");
    if (isAuthenticated) {
      navigate(routeNames.USERLIST);
    }
  }, []);

  const handleSubmitData = async (data: ISigninPayload) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/signin`,
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

      if (result.status === 200) {
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
                  {...register("username", {
                    required: "Username is required",
                  })}
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
                  {...register("password", {
                    required: "Pasword is Required",
                  })}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <div className="mt-3">
                <Link to={"/register"}>Don't have Account Yet ? Sign Up</Link>
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
