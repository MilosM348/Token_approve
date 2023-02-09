import React from 'react'

const Success = () => {

  return (
    <>
      <div className="title text-center">
        Yo<span>ur tokens are claime</span>d!
      </div>
      <p className="text-center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  </p>
      <div className="received">
        You Received...
        <span> 0.8700141 </span>
      </div>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua </p>
      <button type="button" className="btn btn-gradient-primary">  Token Claimed successfully </button>
      <div className="rewards">
        <div className="titr"> Rewards </div>
        <ul>
          <li className="d-flex align-items-center justify-content-between">
            <span> gas spent (matic) </span>
            <span>
              9.0303
              <i className="icon-polygon-matic"></i>
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-between">
            <span> number of transactions </span>
            <span>
              902
              <i className="icon-collapse"></i>
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}
export default Success
