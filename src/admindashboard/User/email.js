import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import Dashboard from "../Common/dashboard";
import Navbar from "../Common/navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Email = () => {
    const [otps, setOtps] = useState([]);
    const [users, setUsers] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https:192.168.1.29:8080/api/auth/users/descending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userData = response.data.filter(user => user.role === 'USER');
            console.log(userData);
            
            setUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchOtps = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https:192.168.1.29:8080/api/auth/otps/descending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const otpsData = response.data.map(otp => ({
                id: otp.id,
                Otp: otp.otp,
                Email: otp.email,
                Joined: formatDate(otp.createdAt)
            }));
            setOtps(otpsData);
        } catch (error) {
            console.error("Error fetching OTPs:", error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
        fetchOtps();
    }, [fetchOtps]);

    useEffect(() => {
        const combined = users.map(user => {
            const otp = otps.find(otp => otp.Email === user.email);
            return otp
                ? {
                    id: otp.id,
                    Email: user.email,
                    Otp: otp.Otp,
                    Joined: otp.Joined,
                }
                : null;
        }).filter(item => item !== null); 
        setCombinedData(combined);
    }, [users, otps]);

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY - HH:mm:ss');
    };

    const handelSubmit = (email) => {
        navigate(`/otp/${email}/detail`);
    };

    const viewBodyTemplate = (rowData) => {
        return (
            <button className="p-button p-button-text" onClick={() => handelSubmit(rowData.Email)}>
                <Icon icon="mdi:eye" />
            </button>
        );
    };

    return (
        <div className="w-screen ">
            <Dashboard />
            <Navbar />
            <div className="ml-[18rem] mr-[2rem] relative top-24 z-10 pb-8">
            <div className="flex items-center text-sm font-medium text-gray-500 ml-1 mb-4">
                    <span>Menu</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-500">User</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-300">Mail</span>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <DataTable value={combinedData} paginator rows={19} className="datatable-basic custom-header">
                        <Column field="id" header="ID" className="border border-gray-300" />
                        <Column field="Email" header="Email" className="border border-gray-300" />
                        <Column field="Otp" header="Otp" className="border border-gray-300" />
                        <Column field="Joined" header="Date" className="border border-gray-300" />
                        <Column body={viewBodyTemplate} header="View" className="border border-gray-300" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Email;
