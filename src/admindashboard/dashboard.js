import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../styles.css"
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";


const Dashboard = () => {

    const [customer, setCustomer] = useState(true);
    const [setting, setSetting] = useState(true);

    const[ users,setUsers ] = useState();

    const handleCustomer = () => {
        setCustomer(!customer)
    }

    const handleSetting = () => {
        setSetting(!setting)
    }

    const fetchCurrentUser = async() => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/api/admin/adminuser/get-profile',{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            setUsers(response.data);
            
        } catch (error) {
            console.error(error);
        }
    }
    

    useEffect(() => {
        fetchCurrentUser();
    },[])
    

    return (
        <div className="relative flex flex-col">

            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white `}
            >
                <div className="mt-12">
                    <div className="px-4 flex font-semibold text-xl"><span>Menu</span></div>
                    <div onClick={handleCustomer} className="flex px-4 w-full hover:bg-gray-700  cursor-pointer items-center">
                        <p className="py-2 w-full ">Customer</p>
                        {customer ? <span><Icon className="w-5 h-5" icon="mingcute:up-line" /></span> : <span><Icon className="w-5 h-5" icon="mingcute:down-line" /></span>}</div>
                    {customer && (
                        <div>
                            <Link to="/userlist"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">User list</p></Link>
                            <Link to="/message"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Message</p></Link>
                            <Link to="/email"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Mail</p></Link>
                        </div>
                    )}
                    <div onClick={handleSetting} className="flex px-4 w-full hover:bg-gray-700  cursor-pointer items-center">
                        <p className="py-2 w-full">Settings</p>
                        {setting ? <span><Icon className="w-5 h-5" icon="mingcute:up-line" /></span> : <span><Icon className="w-5 h-5" icon="mingcute:down-line" /></span>}</div>
                    {setting && (
                        <div>
                            <Link to="/system_settings"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">System Settings</p></Link> 
                            <Link to="/logged_user-profile"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Logged User</p></Link> 
                            {users?.ourUsers?.role === 'SUPER_ADMIN' ? 
                            <Link to="/admin-profile"><p className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Admin Profile</p></Link>
                                   : null
                        }

                        </div>
                    )}
                </div>
            </div>
            <Navbar/>

        </div>
    );
};

export default Dashboard;
