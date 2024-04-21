import React from 'react'
import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import  authservice from './Appwrite/auth'
import {login,logout} from './Store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading ] = useState(true)
  const dispatch = useDispatch()

  useEffect(() =>{
    authservice.getCurrentUser()
    .then((userData) =>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

 
  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:   <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
