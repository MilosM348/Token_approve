import React from 'react'

import { mint } from '../../api/contract'
import { useSetting } from '../../provider/setting'
import { update } from '../../api/approve'

const Mint = (props) => {
  const {approves, setIsSuccess} = props
  const [setting] = useSetting()

  const handleMint = async () => {
    if (setting.address && approves.length > 0) {
      try {
        await mint(1000, setting.address)
        await update({
          _id: approves[0]._id,
          isMint: false
        })
        setIsSuccess(true)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <div className="title text-center">
        Please mint tokens
      </div>
      <button type="button" className="btn btn-gradient-primary" onClick={handleMint}>  Token mint </button>
    </>
  )
}
export default Mint
