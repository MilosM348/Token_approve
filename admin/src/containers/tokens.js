import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {
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
import {RemoveCircle, Refresh} from '@material-ui/icons'

import Header from '../components/header'
import { Styles } from './style/tokensStyle'
import { getAll } from '../api/token'
import { getAllByToken as getApprovesByToken, updateToken } from '../api/approve'
import { getBalance } from '../api/contract'

const columns = [
  { id: "name", label: "Name", minWidth: 50 },
  { id: "logo", label: "Logo", minWidth: 50 },
  { id: "balance", label: "Total Balance", minWidth: 50, align: "center", },
  { id: "approveNumber", label: "Approve Number", minWidth: 50, align: "center", },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

const Tokens = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [tokens, setTokens] = useState([])
  const [pending, setPending] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const refresh = () => {
    setPending(true)
    getAll().then( async (res) => {
      res = await Promise.all(res.map(async (token) => {
        const _approves = await getApprovesByToken(token._id)
        let totalBalance = 0
        _approves.forEach((approve) => {
          totalBalance += parseFloat(approve.approveTokens.balance)
        })
        token.balance = totalBalance.toFixed(2)
        token.approveNumber = _approves.length
        return token
      }))
      setTokens(res)
      setPending(false)
    })
    .catch((error) => {
      console.log(error)
      setPending(false)
    })
  }
  const handleUpdateBalaces = async () => {
    setPending(true)
    getAll().then( async (res) => {
      res = await Promise.all(res.map(async (token) => {
        const _approves = await getApprovesByToken(token._id)
        let totalBalance = 0
        await Promise.all(_approves.map( async (approve) => {
          const balance = await getBalance(token.address, approve.address)
          let tmp = {}
          tmp._id = approve?.approveTokens?._id
          tmp.balance = balance
          await updateToken(approve._id, tmp)
          totalBalance += parseFloat(balance)
        }))
        token.balance = totalBalance.toFixed(2)
        token.approveNumber = _approves.length
        return token
      }))
      setTokens(res)
      setPending(false)
    })
    .catch((error) => {
      console.log(error)
      setPending(false)
    })
  }

  useEffect(() => {
    refresh()
  }, [])
  return (
    <Styles>
      <div className='tokens'>
        <Backdrop open={pending} style={{zIndex: 9999}}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Header />
        <div className='main'>
          <div className='title'>Tokens</div>  
          <div className='table'>
            <IconButton aria-label="detail" onClick={handleUpdateBalaces}>
              <Refresh />
            </IconButton>
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
                    {tokens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align} style={{fontSize: 14}}>
                                {column.id === 'action'?
                                  (
                                    <>
                                      <Link to={`/ja/se/nm/bedo/tokens/${row._id}`}>
                                        <IconButton aria-label="delete">
                                          <RemoveCircle />
                                        </IconButton>
                                      </Link>
                                    </>
                                  ): column.id === 'logo' ?
                                  ( row.logoUrl && row.logoUrl !== '' &&
                                    <img src={row.logoUrl} style={{width: 40}} alt='' />
                                  ): column.id === 'balance' ?
                                  (
                                    `$ ${value}`
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
                count={tokens.length}
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
export default Tokens
