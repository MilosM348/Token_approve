import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

const Aboutus = () => {

  return (
    <>
      <Header />
      <div className="nav-responsive">
        <div className="nav-responsive-backdrop"></div>
        <div className="nav-responsive-content d-flex flex-column">
          <div className="logo d-flex align-items-center justify-content-center position-relative">
            <a href="#" className="position-relative">
              <img src="./assets/images/logo-2.png" alt="logo" />
            </a>
          </div>
          <ul className="menu">
            <li>
              <a href="#">
                <i className="icon-home"></i>
                home
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-info"></i>
                About
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-book"></i>
                Terms and rules
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-document"></i>
                Contract
              </a>
            </li>
          </ul>
          <ul className="socials d-flex align-items-center justify-content-center">
            <li>
              <a href="#">
                <i className="icon-telegram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-discord"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="about-us">
        <div className="container">
          <div className="about-us-wrapper">
            <div className="image position-relative">
              <img src="./assets/images/dollar-dynamic-gradient.png" alt="image" />
            </div>
            <p> Address not eligible for ΞPoadao airdrop
              This address spent less than $1559 in gas </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Aboutus
