import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Common/dashboard";
import "../../styles.css"
import Navbar from "../Common/navbar";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/auth/users/descending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData = response.data
                .filter(user => user.role === 'USER')
                .map(user => ({
                    id: user.id,
                    UserName: user.name,
                    Email: user.email,
                    Phonenumber: user.phoneNumber,
                    Role: user.role,
                    Status: user.enabled === true ? 'Active' : 'Disabled'
                }))
            setUsers(userData);
            console.log(response.data);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    // Custom body for the View column
    // Updated handelSubmit to accept email as a parameter
    const handelSubmit = (email) => {
        navigate(`/user/${email}/detail`);
    };

    // Updated viewBodyTemplate to pass email from rowData
    const viewBodyTemplate = (rowData) => {
        return (
            <button className="p-button p-button-text" onClick={() => handelSubmit(rowData.Email)}>
                <Icon icon="mdi:eye" />
            </button>
        );
    };


    return (
        <div className="w-full">
            <Dashboard />
            <Navbar />
            <div className="ml-[18rem] mr-[2rem] relative top-24">
                <div className="flex items-center text-sm font-medium text-gray-500 mb-5 ml-1">
                    <span>Menu</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-500">User</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-300">Userlist</span>
                </div>

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <DataTable value={users} paginator rows={10} className="datatable-basic custom-header">
                        <Column field="id" header="ID" className="border border-gray-300" />
                        <Column field="UserName" header="UserName" className="border border-gray-300" />
                        <Column field="Email" header="Email" className="border border-gray-300" />
                        <Column field="Phonenumber" header="Phone Number" className="border border-gray-300" />
                        <Column field="Role" header="Role" className="border border-gray-300" />
                        <Column field="Status" header="Status" className="border border-gray-300" />
                        <Column body={viewBodyTemplate} header="View" className="border border-gray-300" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default UserList;
