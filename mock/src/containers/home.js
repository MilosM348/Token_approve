import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/header'
import Footer from '../components/footer'

const Home = () => {

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
      <section className="landing position-relative">
        <div className="container">
          <div className="landing-wrapper text-center">
            <div className="landing-content">
              <div className="image position-relative">
                <Link to="/" className="position-relative d-block">
                  <img src="./logo.png" alt="logo" />
                </Link>
              </div>
              <h2>
                <span> Help shape the future of </span>
                <span className="primary"> web3 </span>
              </h2>
              <p> The governance token for the ?POA DAO, a super-DAO formed with the vision of being the heartbeat and voice of the largest community of Web3 native users on the Polygon Network, bridging the worlds of Defi, NFTs and DApps. </p>
              <div className="d-flex align-items-center justify-content-center">
                <Link to="/claim" className="btn btn-gradient-primary"> Claim Tokens </Link>
                <Link to="/" className="btn btn-secondary"> Data </Link>
              </div>
              <div className="matic"> Totall recive matic in last 60 day - Your Metic circulation: 20matic </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
export default Home
