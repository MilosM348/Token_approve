import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './containers/home'
import Claim from './containers/claim/index'
import Aboutus from './containers/aboutus'

const defaultRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
    </Router>
  )
}
export default defaultRoutes
