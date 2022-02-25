import React, { useEffect } from "react";
import googleImg from "./google (1).png";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "../Redux/googleUsers";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.google.user);
  const activeAuth = useSelector((store) => store.google.active);
  const navigate = useNavigate();

  useEffect(() => {
    const comprobarAuth = () => {
      if (activeAuth) {
        return navigate("/admin");
      }
    };

    comprobarAuth();
  }, [user, activeAuth, navigate]);

  return (
    <div className="loginC">
      <h2 className="loginC__title">Login with Google Account</h2>
      <div onClick={() => dispatch(authUser())} className="googleC">
        <img className="googleC__img" src={googleImg} alt="error"></img>
        <h2 className="googleC__title">Login with google</h2>
      </div>
    </div>
  );
};

export default Login;
