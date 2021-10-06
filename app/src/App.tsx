import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'

import Main from './components/Main'

import './global.css'

const App: React.FC = () => {
  return (
    <Router>
      <Main />
    </Router>
  )
}

export default App;