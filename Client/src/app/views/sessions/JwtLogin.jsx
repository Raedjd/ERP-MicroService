
import { useState } from 'react';
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import axios from "axios";
import cookie from "js-cookie";
import React from "react";
const JwtLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    const authError = document.querySelector(".auth");
    const blockedError = document.querySelector(".blocked");
    e.preventDefault();


    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/auth/login`,

      data: {
        username: username,
        password: password,
      },
    })
        .then((response) => {
          if(response.data.token) {
            cookie.set("jwt", response.data.token);
            navigate("/dashboard")}
            else{
              blockedError.innerHTML=response.data;
            }

        }).catch((err)=>{
          authError.innerHTML = "Verify your username or password"
        })
  }

  let token =cookie.get("jwt");
  return !token ? (
      <div>
        <header id="header" className="d-flex align-items-center">
          <div className="container d-flex justify-content-between">

            <div className="logo">
              <h1 className="text-light"><img
                  src="https://thewealthmosaic.s3.amazonaws.com/media/New_Access_Logo_Positive_an_fnz_company-01.png"
                  alt="New Access Logo Negative_an fnz company-01.png" style={{width:"117px" ,height:"150px"}}
                  fetchpriority="high" /> </h1>
            </div>

            <nav id="navbar" className="navbar">
              <div className="container d-flex justify-content-center justify-content-md-between">
                <div className="contact-info d-flex align-items-center">
                  <i className="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">
                    info@newaccess.ch</a></i>

                </div>


          </div>

            </nav>



          </div>
        </header>
        <section id="hero">
          <div id="heroCarousel" data-bs-interval="5000" className="carousel slide carousel-fade" data-bs-ride="carousel">

            <div className="carousel-inner" role="listbox">

              <div className="carousel-item active" style={{backgroundImage:`url(assets/img/slide/slide-1.jpg)` }} >
                <div className="carousel-container">
                  <div className="carousel-content animate__animated animate__fadeInUp">
                    <h2 className="text-center">Welcome to <span>Intranet New Access </span></h2>
                    <form className="text-center" onSubmit={handleLogin}>
                     <div className="opacity-50" >
                       <input type="text"  name="username"
                              placeholder="username"
                              id="username"
                              onChange={(e) => setUsername(e.target.value)}
                              value={username}
                              aria-describedby="inputGroupPrepend"
                              required
                       /></div>

                     <div className="opacity-50" >
                  <input type="password" name="password"
                         placeholder="password"
                         onChange={(e) => setPassword(e.target.value)}
                         value={password}
                         aria-describedby="inputGroupPrepend"
                         required/></div>
                      <input type="submit" className="text-center bg-dark btn-get-started" value="Login" />
                      <div className="auth text-error"></div>
                      <div className="blocked text-error"></div>
                    </form>

                  </div>
                </div>
              </div>
            </div>



          </div>
        </section>
        <main id="main">

          <section id="cta" className="cta">
            <div className="container">

              <div className="row">
                <div className="col-lg-9 text-center text-lg-left">
                  <h3>Our Story </h3>
                  <p> Founded in 2000,<b style={{color:"#FF4500"}}> New Access an FNZ company  </b> is a <b style={{color:"#FF4500"}}> Swiss roots company </b>, widely open to the world with clients in 18 countries and offices in Switzerland (Geneva & Zurich), France, Singapore and Tunisia</p>
                </div>
                <div className="col-lg-3 cta-btn-container text-center">
                  <a className="cta-btn align-middle" href="https://www.newaccess.ch/">Learn more</a>
                </div>
              </div>

            </div>
          </section>
        </main>
        <footer id="footer">

          <div className="footer-top">
            <div className="container">
              <div className="row">

                <div className="col-lg-3 col-md-6 footer-contact">
                  <h3>Intranet </h3>
                  <div>info@newaccess.ch</div>
                  <div>New Access SA
                    Route de Pré-bois 17
                    1215 Genève 15 Aéroport

                    Switzerland</div>

                </div>


              </div>
            </div>
          </div>

          <div className="container d-md-flex py-4">

            <div className="me-md-auto text-center text-md-start">
              <div className="copyright">
                &copy; 2022 <strong><span>New Access an FNZ company</span></strong>.
              </div>
              <div className="credits">

                Created by Raed Jaidi &#129505;&#129505;
              </div>
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
              <a href="https://twitter.com/NewAccessSA" className="twitter"><i className="bx bxl-twitter"></i></a>
              <a href="https://www.linkedin.com/company/new-access" className="linkedin"><i className="bx bxl-linkedin"></i></a>
            </div>
          </div>
        </footer>

      </div>

  ):(

      <Navigate to="404"/>
  );
};

export default JwtLogin;
