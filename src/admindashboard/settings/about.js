import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import Navbar from "../navbar";
import axios from "axios";

const AboutUS = () => {
    const [ about,setAbout ] = useState("")

    const fetchAbout = async() => {
        try {
            const response = await axios.get('https:192.168.1.29:8080/settings/ABOUT_US');
            setAbout(response.data)            
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        fetchAbout();
    },[])

    const updataAbout = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https:192.168.1.29:8080/settings/update/ABOUT_US?content=${about}`,{
                method: 'PATCH'
            })
            if(response.ok){
                alert("Details updated")
                fetchAbout();
            }
        } catch (error) {
            alert("Failed to update details")
            console.error("Error updating details",error);
        }
    }


    return(
        <>
        <Dashboard/>
        <Navbar/>
 
        <form className="ml-[18rem] mr-[2rem] relative top-24 flex p-8 w-2/3" onSubmit={updataAbout}>
            <label className="setting-label-width">About us</label>
            <div className="flex">
            <textarea rows={10} cols={100} placeholder="Enter text" value={about.content} onChange={(e) => setAbout(e.target.value)} className="border-2 border-gray-300 bg-gray-100 focus:outline-none p-5 mb-5 w-full"></textarea>
            <button className="absolute bottom-0 right-8 p-2 bg-cta rounded-md text-white" onClick={updataAbout}>Update</button>
            </div>
        </form> 
        </>
    )
};
export default AboutUS;