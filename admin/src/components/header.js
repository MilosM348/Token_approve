import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Styles } from './style/headerStyle'
import { getShortAddress } from '../service/string'
import { connect } from '../api/connect'
import { useSetting } from '../provider/setting'
import Setting from './setting'

const Header = () => {
  const [setting, dispatch] = useSetting()

  const handleConnect = () => {
    connect()
    .then((res) => {
      dispatch({type: 'SET', settingName: 'address', settingData: res.account})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    handleConnect()
  }, [])
  return (
    <Styles>
      <div className='header'>
        <div className='logo'></div>
        <div className='menu'>
          <Link to='/ja/se/nm/bedo/' className='menu-item'>
            Tokens
          </Link>
          <Setting className='menu-item' />
        </div>
        <div className='right'>
          <button className='wallet-connect' onClick={handleConnect}>
            {(!setting?.address) ? "Connect Wallet" : getShortAddress(setting.address)}
          </button>
        </div>
      </div>
    </Styles>
  );
}

export default Header;