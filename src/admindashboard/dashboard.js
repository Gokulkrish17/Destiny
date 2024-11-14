import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../styles.css"
import { Link } from "react-router-dom";


const Dashboard = () => {
    const [sidebar, setSidebar] = useState(true);
    const [menu, setMenu] = useState(true);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    };
    
    const handleMenu = ()=>{
        setMenu(!menu)
    }

    return (
        <div className="relative flex flex-col">
      
            <div 
                className={`fixed top-0 left-0 h-[53rem] w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${sidebar ? 'translate-x-0' : '-translate-x-64'} z-40`}
            >
                <button className="absolute top-4 right-4 text-white text-2xl" onClick={handleSidebar}>
                    <Icon icon="ic:round-close" />
                </button>
                <div className="mt-12">
                    <div className="px-4 flex font-semibold text-xl"><span>Menu</span></div>
                    <div onClick={handleMenu} className="flex px-4 w-full hover:bg-gray-700  cursor-pointer items-center"><p  className="py-2 w-full ">Customer</p>{menu?<span><Icon className="w-5 h-5" icon="mingcute:up-line" /></span>:<span><Icon className="w-5 h-5" icon="mingcute:down-line" /></span>}</div>
                    {menu && (
                        <div>
                            <Link to = "/userlist"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">User list</p></Link>
                            <Link to = "/message"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Message</p></Link>
                            <Link to = "/email"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Mail</p></Link>
                        </div>
                    )}
                </div>
            </div>
            <div 
                className={`flex-1 transition-transform duration-300 ease-in-out ${sidebar ? 'ml-64' : 'ml-0'}`}
            >
                <nav className="relative flex items-center justify-between w-full h-16 px-8 bg-white shadow-md z-30">
                    <div className="flex items-center gap-6">
                    <Icon onClick={handleSidebar} icon="ic:round-menu" className="text-xl w-6 h-6 cursor-pointer" />
                    <img src="logo.png" className="h-11" alt="Logo" />
                    </div>
                    <div className="relative"><input className="border h-8 border-black rounded-md" /><Icon className="absolute right-2 cursor-pointer top-2" icon="tdesign:search" /></div>
                </nav>
                </div>
            
            
        </div>
    );
};

export default Dashboard;
