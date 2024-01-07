/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";
import Logo from "../../assets/Background.svg";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      enqueueSnackbar("Please fill in both email and password fields", {
        variant: "error",
      });

      return;
    }

    try {
      const response = await axios.get(
        `https://endpoint.careafox.com/api/login?username=${email}&password=${password}&expire=72000`
      );


      if (response.status === 200) {
        const jwt = response.data.JWT;
        localStorage.setItem("jwt", jwt);
        navigate("/dashboard");

        enqueueSnackbar("User logged in successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Invalid credentials", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.log(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="loginMain">
        <div className="leftContainer">
          <div
            className="logoBox"
            style={{
              marginBottom: "40px",
            }}
          >
            <img src={Logo} alt="owl" />
          </div>

          <form onSubmit={handleSubmit} className="formBox">
            <input
              type="email"
              className="form-control inputFields"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <input
              type="password"
              className="form-control inputFields"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              placeholder="Password"
            />
            <p
              style={{
                textAlign: "end",
                color: "#287287",
              }}
            >
              Forgot password
            </p>
            {/* type="submit" */}
            <button className="signUpBtn" onClick={handleSubmit}>
              Login
            </button>
            <div className="noAccBox">
              Don't have an account?
              <span>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p
                    style={{
                      color: "#287287",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    Sign up
                  </p>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
