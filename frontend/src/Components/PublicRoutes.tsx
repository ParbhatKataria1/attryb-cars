import {Routes, Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Sign from '../Pages/Sign'
import Home from '../Pages/Home'
import Details from '../Pages/Details'
import Addfile from '../Pages/Addfile'

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Sign/>} ></Route>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/details' element={<Details/>} ></Route>
        <Route path='/addfile' element={<Addfile/>} ></Route>
    </Routes>
  )
}

export default PublicRoutes