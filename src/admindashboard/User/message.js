import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import Dashboard from "../Common/dashboard";
import Navbar from "../Common/navbar";


const Message = () => {
    const [users, setUsers] = useState([]);
    const [otps, setOtps] = useState([]);

    // Fetch user data
    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/api/auth/users/descending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const usersData = response.data
                .filter(user => user.role === 'USER')
                .map(user => ({
                    id: user.id,
                    UserName: user.name,
                    Email: user.email,
                    Phonenumber: user.phoneNumber,
                    Role: user.role,
                    Status: user.enabled === true ? 'Active' : 'Disabled'
                }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    // Fetch OTP data
    const fetchOtps = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get('http://localhost:8080/api/auth/otps/descending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const otpsData = response.data.map(otp => ({
                id: otp.id, // Ensure this matches the key in the OTP response that links to the user
                Otp: otp.otp,
                Joined: otp.createdAt
            }));
            setOtps(otpsData);
        } catch (error) {
            console.error("Error fetching OTP data:", error);
        }
    };

    const userdata = users.map(user => {
        const otpData = otps.find(otp => otp.id === user.id);
        return {
            ...user,
            Otp: otpData ? otpData.Otp : 'N/A',
            Joined: otpData ? new Date(otpData.Joined).toLocaleString() : 'N/A'
        };
    });

    useEffect(() => {
        fetchUsers();
        fetchOtps();
    }, []);

    return (
        <div className="w-full">
            <Dashboard />
            <Navbar />
            <div className="ml-[18rem] mr-[2rem] relative top-24">
                <div className="flex items-center text-sm font-medium text-gray-500 ml-1 mb-4">
                    <span>Menu</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-500">User</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-300">Message</span>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <DataTable value={userdata} paginator rows={10} className="datatable-basic custom-header ">
                        <Column field="id" header="ID" className="border border-gray-300 px-2" />
                        <Column field="UserName" header="UserName" className="border border-gray-300 px-2" />

                        <Column field="Otp" header="OTP" className="border border-gray-300 px-2" />
                        <Column field="Joined" header="Date" className="border border-gray-300 px-2" />
                    </DataTable>
                </div>
            </div>
        </div>

    );
};

export default Message;