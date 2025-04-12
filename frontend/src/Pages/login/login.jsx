// // import React from "react";
// // import "./login.css"; // Contains padding for login content
// // import { MdEmail } from "react-icons/md";
// // import { RiLockPasswordFill } from "react-icons/ri";

// // const Login = () => {
// //   return (
// //     <div className="login-page">
// //       <div className="row mt-3">
// //         <h1 className="col-6 offset-3 text-center">Login</h1>
// //         <div className="col-10 offset-1">
// //           <form
// //             action="/users/login"
// //             method="post"
// //             noValidate
// //             className="needs-validation"
// //           >
// //             {/* Email Field with Icon */}
// //             <div className="mb-3">
// //               <label htmlFor="email" className="form-label">
// //                 Email
// //               </label>
// //               <div className="input-group">
// //                 <input
// //                   type="text"
// //                   id="username"
// //                   name="username"
// //                   className="form-control"
// //                   required
// //                 />
// //                 <span className="input-group-text">
// //                   <MdEmail />
// //                 </span>
// //               </div>
// //               <div className="valid-feedback">Looks Good</div>
// //             </div>

// //             {/* Password Field with Icon */}
// //             <div className="mb-3">
// //               <label htmlFor="password" className="form-label">
// //                 Password
// //               </label>
// //               <div className="input-group">
// //                 <input
// //                   type="password"
// //                   id="password"
// //                   name="password"
// //                   className="form-control"
// //                   required
// //                 />
// //                 <span className="input-group-text">
// //                   <RiLockPasswordFill />
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Remember Me Checkbox */}
// //             <div className="mb-3 form-check">
// //               <input
// //                 type="checkbox"
// //                 className="form-check-input"
// //                 id="rememberMe"
// //                 name="rememberMe"
// //               />
// //               <label className="form-check-label" htmlFor="rememberMe">
// //                 Remember me
// //               </label>
// //             </div>

// //             <button className="btn btn-success">Login</button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState } from "react";
// import axios from "axios";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Handle form submission
// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       const response = await axios.post("/users/login", {
// //         username: email,
// //         password,
// //         rememberMe,
// //       });

// //       // Handle successful login response
// //       if (response.status === 200) {
// //         console.log("Login successful", response.data);
// //         // Redirect to another page, for example:
// //         // window.location.href = "/dashboard";
// //       }
// //     } catch (error) {
// //       // Handle login error
// //       console.error("Login failed", error.response || error);
// //       setErrorMessage("Invalid email or password");
// //     }
// //   };
// const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("/users/login", {
//         username: email,
//         password,
//         rememberMe,
//       });
  
//       // Handle successful login response
//       if (response.status === 200) {
//         console.log("Login successful", response.data);
  
//         // Save the user data and tokens to localStorage
//         const { user, tokens } = response.data;
  
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("accessToken", tokens.access.token);
//         localStorage.setItem("refreshToken", tokens.refresh.token);
  
//         // Optionally, set expiration for the access token if needed
//         const tokenExpiration = new Date(tokens.access.expires);
//         localStorage.setItem("accessTokenExpiration", tokenExpiration);
  
//         // Redirect to another page (optional)
//         // window.location.href = "/dashboard";
//       }
//     } catch (error) {
//       // Handle login error
//       console.error("Login failed", error.response || error);
//       setErrorMessage("Invalid email or password");
//     }
//   };
  

//   return (
//     <div className="login-page">
//       <div className="row mt-3">
//         <h1 className="col-6 offset-3 text-center">Login</h1>
//         <div className="col-10 offset-1">
//           <form onSubmit={handleSubmit} noValidate className="needs-validation">
//             {/* Email Field with Icon */}
//             <div className="mb-3">
//               <label
//                 htmlFor="username"
//                 className="form-label fw-semibold"
//                 style={{ color: "#333" }}
//               >
//                 Email address
//               </label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white">
//                   <MdEmail style={{ color: primaryColor }} />
//                 </span>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="username"
//                   name="username"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="mb-3">
//               <label
//                 htmlFor="password"
//                 className="form-label fw-semibold"
//                 style={{ color: "#333" }}
//               >
//                 Password
//               </label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white">
//                   <RiLockPasswordFill style={{ color: primaryColor }} />
//                 </span>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Remember Me Checkbox */}
//             <div className="mb-3 form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="rememberMe"
//                 name="rememberMe"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <label className="form-check-label" htmlFor="rememberMe">
//                 Remember me
//               </label>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="mb-3 text-danger">{errorMessage}</div>
//             )}

//             <button className="btn btn-success">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const primaryColor = "#28a745"; // <-- Add your primary color here

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/users/login", {
        username: email,
        password,
        rememberMe,
      });

      if (response.status === 200) {
        console.log("Login successful", response.data);
        const { user, tokens } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);

        const tokenExpiration = new Date(tokens.access.expires);
        localStorage.setItem("accessTokenExpiration", tokenExpiration);

        // window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login failed", error.response || error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="row mt-3">
        <h1 className="col-6 offset-3 text-center">Login</h1>
        <div className="col-10 offset-1">
          <form onSubmit={handleSubmit} noValidate className="needs-validation">
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold" style={{ color: "#333" }}>
                Email address
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <MdEmail style={{ color: primaryColor }} />
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold" style={{ color: "#333" }}>
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <RiLockPasswordFill style={{ color: primaryColor }} />
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            {errorMessage && (
              <div className="mb-3 text-danger">{errorMessage}</div>
            )}

            <button className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
