import Login from "./components/Login"
import { Routes,Route, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "./firebase"
import Main from "./components/Main"
import Details from "./components/Details"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sell from "./components/Sell"




const App = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
    if(user){
      console.log('Logged in')
      navigate('/')
    }else{
      console.log('Logged out')
      navigate('/login')
    }
    })
  },[])
  return (
  <div>
     <ToastContainer theme='dark' />
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/sell' element={<Sell/>}/>
      
    </Routes>
    
  </div>
  )
}

export default App
