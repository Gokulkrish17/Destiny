import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Dashboard from "../dashboard";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";

const AdminProfile = () => {

    const [ adminUser,setAdminUser ] = useState();
    const navigate = useNavigate();

    const fetchAdminProfile = async() => {
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get('http://localhost:8080/api/admin/all-profiles',{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            const userData = response.data
            .filter(user => user.role === 'ADMIN')
            .map(user => ({
                Id : user.id,
                Name : user.name,
                Email : user.email   
            }));
            setAdminUser(userData)
        }catch(error){
            console.error(error);
            
        }
    };

    useEffect(() => {
        fetchAdminProfile();
    },[])

    const handelSubmit = (email) => {
        navigate(`/admin-profile/${email}`);
    };

    const viewBodyTemplate = (rowData) => {
        return (
            <button className="p-button p-button-text" onClick={() => handelSubmit(rowData.Email)}>
               <Icon icon="mdi:eye" />
            </button>
    );
    };

    return (
        <><div className="w-screen ">
            <Dashboard />
            <Navbar />
            <div className="ml-[18rem] mr-[2rem] relative top-24 z-10 pb-8">
                <div className="border  border-gray-300 rounded-lg overflow-hidden">

                    <DataTable value={adminUser} paginator rows={19} className="datatable-basic custom-header">
                        <Column field="Id" header="ID" className="border border-gray-300" />
                        <Column field="Name" header="Name" className="border border-gray-300" />
                        <Column field="Email" header="Email" className="border border-gray-300" />
                        <Column body={viewBodyTemplate} header="View" className="border border-gray-300" />
                    </DataTable>
                </div>
            </div>
        </div>

        </>
    )
};

export default AdminProfile;