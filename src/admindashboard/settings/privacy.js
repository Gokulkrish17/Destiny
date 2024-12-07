import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import Navbar from "../navbar";
import axios from "axios";

const Privacy = () => {
    const [ privacy,setPrivacy ] = useState("");

    const fetchPrivacy = async () => {
        try {
            const response = await axios.get('http://localhost:8080/settings/PRIVACY_POLICY')
            setPrivacy(response.data)
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        fetchPrivacy();
    },[])

    const updatePrivacy = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8080/settings/update/PRIVACY_POLICY?content=${privacy}`);
            if(response.ok){
                alert("Details updated")
                fetchPrivacy();
            }
        } catch (error) {
            alert("Failed to update details")
            console.error(error);    
        }
    }

    return(
        <>
         <Dashboard/>
        <Navbar/>
 
        <form className="ml-[18rem] mr-[2rem] relative top-24 flex p-8 w-2/3">
            <label className="setting-label-width">Privacy policy</label>
            <div className="flex">
            <textarea rows={10} cols={100} placeholder="Enter text" value={privacy.content} onChange={(e) => {setPrivacy(e.target.value)}} className="border-2 border-gray-300 bg-gray-100 focus:outline-none p-5 mb-5 w-full"></textarea>
            <button className="absolute bottom-0 right-8 p-2 bg-cta rounded-md text-white" onClick={updatePrivacy}>Update</button>
            </div>
        </form> 
        </>
    )
};
export default Privacy;