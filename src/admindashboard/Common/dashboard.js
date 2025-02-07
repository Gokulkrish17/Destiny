import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../../styles.css"
import { Link, useLocation } from "react-router-dom";
import Navbar from "./navbar.js";
import axios from "axios";


const Dashboard = () => {

    const [customer, setCustomer] = useState(true);
    const [setting, setSetting] = useState(true);
    const [users, setUsers] = useState();
    const location = useLocation();

    const handleCustomer = () => {
        setCustomer(!customer)
    }

    const handleSetting = () => {
        setSetting(!setting)
    }

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/api/admin/adminuser/get-profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUsers(response.data);

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchCurrentUser();
    }, [])


    return (
        <div className="relative flex flex-col">

            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white `}
            >
                <div className="mt-12">
                    <div className="px-4 flex font-semibold text-xl"><span>Menu</span></div>
                    <div onClick={handleCustomer} className="flex px-4 w-full hover:bg-gray-900  cursor-pointer items-center">
                        <p className="py-2 w-full ">User</p>
                        {customer ? <span><Icon className="w-5 h-5" icon="mingcute:up-line" /></span> : <span><Icon className="w-5 h-5" icon="mingcute:down-line" /></span>}</div>
                    {customer && (
                        <div>
                            <Link to="/dashboard-page">
                                <p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer`}>
                                    Dashboard
                                </p>
                            </Link>

                            <Link to="/promotion">
                                <p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer`}>
                                    Promotion
                                </p>
                            </Link>
                            <Link to="/userlist">
                                <p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer ${location.pathname.startsWith("/user/") || location.pathname === "/userlist"
                                    ? "bg-gray-700"
                                    : "hover:bg-gray-700"
                                    }`}>
                                    User list
                                </p>
                            </Link>
                            <Link to="/birthday">
                                <p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer`}>
                                    Birthday
                                </p>
                            </Link>

                            <Link to="/message"><p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer ${location.pathname === "/message" ? "bg-gray-700" : "hover:bg-gray-700"
                                }`}>Message</p></Link>
                            <Link to="/email"><p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer ${location.pathname.startsWith("/otp/") || location.pathname === "/email" ? "bg-gray-700" : "hover:bg-gray-700"
                                }`}>Mail</p></Link>
                            <Link to="/artist-crew-details"><p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer ${location.pathname.startsWith("/artist/") || location.pathname === "/artist-crew-details" ? "bg-gray-700" : "hover:bg-gray-700"
                                }`}>Professional Information</p></Link>
                                <Link to="/general-settings">
                                <p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer`}>
                                    General Settings
                                </p>
                            </Link>
                            <Link to="/delete-user">
                                <p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer`}>
                                    Delete User
                                </p>
                            </Link>
                        </div>
                    )}
                    <div onClick={handleSetting} className="flex px-4 w-full hover:bg-gray-900  cursor-pointer items-center">
                        <p className="py-2 w-full">Settings</p>
                        {setting ? <span><Icon className="w-5 h-5" icon="mingcute:up-line" /></span> : <span><Icon className="w-5 h-5" icon="mingcute:down-line" /></span>}</div>
                    {setting && (
                        <div>
                            <Link to="/system_settings"><p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer ${location.pathname === "/system_settings" ? "bg-gray-700" : "hover:bg-gray-700"
                                }`}>System Settings</p></Link>
                            <Link to="/logged_user-profile"><p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer ${location.pathname.startsWith("/logged_user/") || location.pathname === "/logged_user-profile" ? "bg-gray-700" : "hover:bg-gray-700"
                                }`}>Logged User</p></Link>
                            {users?.ourUsers?.role === 'SUPER_ADMIN' ?
                                <Link to="/admin-profile"><p className={`py-2 px-6 hover:bg-gray-900 cursor-pointer ${location.pathname.startsWith("/admin-profile/") || location.pathname === "/admin-profile" ? "bg-gray-700" : "hover:bg-gray-700"
                                    }`}>Admin Profile</p></Link>
                                : null
                            }

                        </div>
                    )}

                    <div onClick={handleSetting} className="flex px-4 w-full hover:bg-gray-900  cursor-pointer items-center">
                        <p className="py-2 w-full">Events</p>
                        {setting ? <span><Icon className="w-5 h-5" icon="mingcute:up-line" /></span> : <span><Icon className="w-5 h-5" icon="mingcute:down-line" /></span>}</div>
                </div>
            </div>
            <Navbar />

        </div>
    );
};

export default Dashboard;
