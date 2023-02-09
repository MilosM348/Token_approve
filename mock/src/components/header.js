import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getShortAddress } from '../service/string'
import { connect } from '../api/connect'
import { useSetting } from '../provider/setting'

const Header = () => {
  const [setting, dispatch] = useSetting()
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = () => {
    connect()
    .then((res) => {
      dispatch({type: 'SET', settingName: 'address', settingData: res.account})
      setIsOpen(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  const handleOpen = () => {
    if (!setting.address)
      setIsOpen(true)
  }

  useEffect(() => {
    handleConnect()
  }, [])
  return (
    <>
      <header className="top-header position-relative">
        <div className="container d-flex align-items-center">
          <button type="button" className="top-header-btn-nav d-lg-none">
            <i className="icon-grid"></i>
          </button>
          <Link to='/' className="top-header-logo d-flex align-items-center">
            <img src="./logo.png" alt="logo" className="d-none d-lg-inline-block" />
            <img src="./assets/images/app-store.png" alt="logo" className="d-lg-none" />
            <span className="d-none d-lg-inline-block"> Poadao </span>
          </Link>
          <ul className="top-header-socials d-none d-lg-flex align-items-lg-center">
            <li>
              <a href="https://twitter.com/poadaoio">
                <i className="icon-twitter"></i>
              </a>
            </li>
            {/* <li>
              <Link to="#">
                <i className="icon-instagram"></i>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="icon-facebook"></i>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="icon-twitter"></i>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="icon-discord"></i>
              </Link>
            </li> */}
          </ul>
          <ul className="top-header-menu d-none d-lg-flex align-items-lg-center">
            <li>
              <Link to="/"> home </Link>
            </li>
            {/* <li>
              <Link to="/aboutus"> About </Link>
            </li> */}
          </ul>
          <div className="top-header-wallet position-relative">
            <button type="button" className="btn btn-gradient-primary d-flex align-items-center justify-content-center" onClick={handleOpen}>
              <i className="icon-wallet"></i>
              <span className="d-none d-md-inline-block"> {(!setting?.address)?'Connect Wallet':getShortAddress(setting.address)} </span>
            </button>
          </div>
        </div>
      </header>
      <div id="modal-wallet" className={`modal modal-wallet${isOpen?' opened':''}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="modal-close" onClick={() => setIsOpen(false)}>
                <i className="icon-close"></i>
              </button>
              <div className="image position-relative">
                <img src="./assets/images/wallet.png" alt="wallet" />
              </div>
              <div className="title text-center"> Connect Wallet </div>
              <ul>
                <li className="position-relative d-flex align-items-center" onClick={handleConnect}>
                  <a href="#"></a>
                  <div className="image">
                    <img src="./assets/images/metamask.png" alt="metamask" />
                  </div>
                  <div className="detail">
                    <div className="title"> Metamask </div>
                    <div className="sub-title"> Connect To Your Metamask Wallet </div>
                  </div>
                </li>
                {/* <li className="position-relative d-flex align-items-center">
                  <a href="#"></a>
                  <div className="image">
                    <img src="./assets/images/wallet-connect.png" alt="wallet-connect" />
                  </div>
                  <div className="detail">
                    <div className="title"> Walletconnect </div>
                    <div className="sub-title"> Scan With Walletconnect To Connect </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;