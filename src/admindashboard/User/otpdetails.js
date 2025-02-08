import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../Common/dashboard";
import Navbar from "../Common/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";

const OtpDetails = () => {
    const { email } = useParams();
    const [otpDetails, setOtpDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOtpDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https:192.168.1.29:8080/api/auth/otp-details/${email}`,{
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });
                const otpsData = response.data.map(otp => ({
                    id: otp.id,
                    Otp: otp.otp,
                    Message: otp.emailOtpContent,
                    Type: otp.otpType,
                    Email: otp.email,
                    Joined: formatDate(otp.createdAt)
                }));
                setOtpDetails(otpsData);
            } catch (error) {
                console.error("Error fetching otp details:", error);
            }
        };
        fetchOtpDetails();
    }, [email]);

    const rowClass = (index) => {
        return index % 2 === 0 ? '' : 'bg-gray-50';
    };

    function formatDate(dateString) {
        return moment(dateString).format('DD/MM/YYYY - HH:mm:ss');
    }

    
    return (
        <>
            <Dashboard />
            <Navbar />
            <div className="ml-[18rem] mr-[2rem] relative top-24 z-10 pb-8">
            <div className="flex items-center text-sm font-medium text-gray-500 ml-1 mb-4">
                    <span>Menu</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-500">User</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-500 cursor-pointer" onClick={() => navigate('/email')}>Mail</span>
                    <span className="mx-2 text-gray-400">&gt;</span>
                    <span className="text-gray-300 ">{email}</span>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <DataTable
                        value={otpDetails}
                        paginator
                        rows={19}
                        className="datatable-basic custom-header"
                        rowClassName={rowClass}
                    >
                        <Column field="id" header="ID" className="border border-gray-300" />
                        <Column field="Email" header="Email" className="border border-gray-300" />
                        <Column field="Message" header="Message" className="border border-gray-300" />
                        <Column field="Type" header="Type" className="border border-gray-300" />
                        <Column field="Otp" header="Otp" className="border border-gray-300" />
                        <Column field="Joined" header="Date" className="border border-gray-300" />
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default OtpDetails;
