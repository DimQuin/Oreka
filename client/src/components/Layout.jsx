import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <Toaster/>
    </div>
  )
}
