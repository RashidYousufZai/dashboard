/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./styles.css";
import Logo from "../../assets/Background.svg";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [cPass, setCPass] = useState("");
  let navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { email, password } = credentials;

//     if (!email || !password) {
//       enqueueSnackbar("Please fill in both email and password fields", {
//         variant: "error",
//       });

//       return;
//     }
//     if (password !== cPass) {
//       enqueueSnackbar("Passwords do not match", {
//         variant: "error",
//         autoHideDuration: 2000,
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCF7PiEm_qN4tI63oTqLo8KjP0lsk7SjLk",
//         {
//           email,
//           password,
//           returnSecureToken: true,
//         }
//       );

//       const data = response.data;

//       if (data.idToken) {
//         TokenService().updateToken(data.idToken);
//         navigate("/dashboard");
//         enqueueSnackbar("User created successfully", {
//           variant: "success",
//           autoHideDuration: 2000,
//         });
//       } else {
//         enqueueSnackbar("Invalid credentials", {
//           variant: "error",
//           autoHideDuration: 2000,
//         });
//       }
//     } catch (error) {
//       enqueueSnackbar("An error occurred", {
//         variant: "error",
//         autoHideDuration: 2000,
//       });
//     }
//   };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = () =>{}

  return (
    <>
      <div className="loginMain">
        <div className="leftContainer">
          <div className="logoBox">
            <img src={Logo} alt="owl" />
          </div>
          <p
            style={{
              textAlign: "center",
              color: "#7E7E7E",
              fontSize: "15.035px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "10.9px",
            }}
          >
            and 123,6788 other users having a good time
          </p>

          <p className="signupHeading">Sign up</p>

          <form onSubmit={handleSubmit} className="formBox">
            <input
              // type="email"
              className="form-control inputFields"
              // value={credentials.email}
              onChange={() => {}}
              // id="email"
              // name="email"
              // aria-describedby="emailHelp"
              placeholder="Full Name"
            />
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
            <input
              type="password"
              className="form-control inputFields"
              value={cPass}
              onChange={(e) => {
                setCPass(e.target.value);
              }}
              name="password"
              id="password2"
              placeholder="Confirm password"
            />
            {/* type="submit" */}
            <button  className="signUpBtn" onClick={handleSubmit}>
              Sign up
            </button>
            <div className="noAccBox">
              Already have an account?
              <span>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p
                    style={{
                      color: "#287287",
                      fontWeight: "700",
                      fontSize:"18px"
                    }}
                  >
                    Login
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

export default Signup;
