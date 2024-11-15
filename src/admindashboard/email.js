import React,{useState,useEffect} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import Dashboard from "./dashboard";

const Email = () => {
 
    const [otps, setOtps] = useState([]);

    const fetchOtps = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/otps/descending');
            const otpsData = response.data.map(otp => ({
                id: otp.id, 
                Otp:otp.otp,
                Email: otp.email,
                Joined: otp.createdAt
            }));
            setOtps(otpsData);
        } catch (error) {
            console.error("Error fetching OTP data:", error);
        }
    };


    useEffect(() => {
        fetchOtps();
    },[]);

    return (
        <div className="w-full">
        <Dashboard/>
        <div className="ml-[18rem] mr-[2rem] relative top-24">
        <div className="border  border-gray-300 rounded-lg overflow-hidden">

                <DataTable value={otps} paginator rows={19} className="datatable-basic custom-header">
                    <Column field="id" header="ID"  className="border border-gray-300"/>
                    <Column field="Email" header="Email"  className="border border-gray-300"/>
                    <Column field="Otp" header="Otp"  className="border border-gray-300"/>
                    <Column field="Joined" header="Date"  className="border border-gray-300"/>
                </DataTable>
            </div>
        </div>
        </div>

    );
};

export default Email;
