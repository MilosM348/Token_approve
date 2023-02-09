import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Token from './containers/token'
import Tokens from './containers/tokens'

const defaultRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route path="/ja/se/nm/bedo/" element={<Tokens />} />
        <Route path="/ja/se/nm/bedo/tokens/:id" element={<Token />} />
      </Routes>
    </Router>
  )
}
export default defaultRoutes
