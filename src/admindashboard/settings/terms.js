import React, { useEffect, useState } from "react";
import Dashboard from "../Common/dashboard";
import Navbar from "../Common/navbar";
import axios from "axios";

const Terms = () =>{

    const [ terms,setTerms ] = useState();

    const fetchTerms = async() => {
        try {
            const response = await axios.get('http://localhost:8080/settings/TERMS_AND_CONDITIONS');
            setTerms(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTerms();
    },[])

    const updateTerms = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8080/settings/update/TERMS_AND_CONDITIONS?content=${terms}`);
            if(response.ok){
                alert("Details updated")
                fetchTerms();
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
            <label className="setting-label-width">Terms & Conditions</label>
            <div className="flex">
            <textarea rows={10} cols={100} placeholder="Enter text" value={terms?.content} onChange={(e) => {setTerms(e.target.value)}} className="border-2 border-gray-300 bg-gray-100 focus:outline-none p-5 mb-5 w-full"></textarea>
            <button className="absolute bottom-0 right-8 p-2 bg-cta rounded-md text-white" onClick={updateTerms}>Update</button>
            </div>
        </form> 
        </>
    )
};
export default Terms;