import { useEffect, useState } from "react";
import Dashboard from "../Common/dashboard";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistDetails = () => {

    const [artistDetails, setArtistDetails] = useState();
    const navigate = useNavigate();


    const getArtistDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/users',{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            });
            const userData = response.data
            .map( user => ({
                id: user.userid,
                UserName: user.name,
                Email: user.email,
                Joined: user.joined,
            }))
            setArtistDetails(userData);
            console.log(response.data);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {   
        getArtistDetails();
    },[])

     const viewBodyTemplate = (rowData) => {
        return (
            <button className="p-button p-button-text" onClick={() => handelSubmit(rowData.id)}>
               <Icon icon="mdi:eye" />
            </button>
    );
    };

    const handelSubmit = (id) => {
        navigate(`/artist/${id}/detail`);
    };

    return (
        <>

        <Dashboard />

           <div className="ml-[18rem] mr-[2rem] relative top-24">
           <div className="flex items-center text-sm font-medium text-gray-500 ml-1 mb-4">
                    <span>Menu</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-500">User</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-300">Professional Information</span>
                </div>
                       <div className="border border-gray-300 rounded-lg overflow-hidden">
                           <DataTable value={artistDetails} paginator rows={10} className="datatable-basic custom-header">
                               <Column field="id" header="ID" className="border border-gray-300" />
                               <Column field="UserName" header="UserName" className="border border-gray-300" />
                               <Column field="Email" header="Email" className="border border-gray-300" />
                               <Column field="Joined" header="Joined" className="border border-gray-300" />
                               <Column body={viewBodyTemplate}  header="View" className="border border-gray-300" />
                           </DataTable>
                       </div>
                   </div>           

        </>
    );
}
export default ArtistDetails;