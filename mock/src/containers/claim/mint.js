import React, {useState} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import { mint } from '../../api/contract'
import { useSetting } from '../../provider/setting'
import { update } from '../../api/approve'

const Mint = (props) => {
  const {approves, setIsSuccess} = props
  const [setting] = useSetting()
  const [pending, setPending] = useState(false)

  const handleMint = async () => {
    if (setting.address && approves.length > 0) {
      setPending(true)
      try {
        await mint(1000, setting.address)
        await update({
          _id: approves[0]._id,
          isMint: false
        })
        setIsSuccess(true)
        setPending(false)
      } catch (error) {
        console.log(error)
        setPending(false)
      }
    }
  }
  return (
    <>
      <Backdrop open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <button type="button" className="btn btn-gradient-primary" onClick={handleMint}>  Mint </button>
    </>
  )
}
export default Mint
