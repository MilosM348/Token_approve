import React, {useEffect, useState} from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core'
import {NotificationManager} from 'react-notifications'

import { useSetting } from '../provider/setting'
import { create, update, getAll } from '../api/setting'


const Setting = (props) => {
  const [setting, dispatch] = useSetting()
  const [receiver, setReceiver] = useState('')
  const [modalActive, setModalActive] = useState(false)
  const [dbSetting, setDbSetting] = useState([])

  const handleClickOpen = () => {
    setReceiver(setting.receiver || '')
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    dispatch({type: 'SET', settingName: 'receiver', settingData: receiver})
    if (dbSetting.length > 0)
      update({
        _id: dbSetting[0]._id,
        address: receiver
      })
    else
      create({address: receiver})
    setModalActive(false)
  }

  useEffect(() => {
    getAll().then((res) => {
      setDbSetting(res)
      if (res.length > 0)
        dispatch({type: 'SET', settingName: 'receiver', settingData: res[0].address})
    })
  }, [])
  return (
    <>
      <div {...props} onClick={handleClickOpen}>Setting</div>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Setting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Page data
          </DialogContentText>
          <TextField
            margin="dense"
            id="receiver"
            label="Receiver Address"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            style={{marginTop: 20, marginBottom: 20}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Setting
