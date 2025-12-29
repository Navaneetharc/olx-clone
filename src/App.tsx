import React from 'react'
import Home from './components/Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Details from './components/Details/Details'

const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/details' element={<Details/>}/>
    </Routes>
    </>
  )
}

export default App
