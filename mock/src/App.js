import React from "react";

import Routers from './router'
import { SettingProvider } from './provider/setting'

const App = () => {
  
  return (
    <SettingProvider>
      <Routers />
    </SettingProvider>
  )
}

export default App;