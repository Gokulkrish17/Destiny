import React from 'react'
import logo from "../../logo.png"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className="w-screen">
    <nav className="fixed flex items-center justify-between w-[calc(100vw-16rem)] ml-[16rem] h-16 px-8 bg-white shadow-md z-20">
        <div className="flex items-center gap-6">
            <img src={logo} className="h-11" alt="Logo" />
        </div>
        <div className="relative">
            <input className="border h-8 w-44 border-black rounded-md navbar-searchbar" placeholder="Search" />
            <Icon className="cursor-pointer absolute top-3 right-24" icon="tdesign:search" />
            <button className='custom-form p-2 border rounded-md ml-4' onClick={handleLogout}>Logout</button>
        </div>
    </nav>
</div>
  )
}

export default Navbar