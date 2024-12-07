import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './dashboard';
import Navbar from './navbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';

const UserDetails = () => {
    const { email } = useParams(); // Get the email from the URL
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8080/api/users/getBy-email?email=${email}`,{
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [email]);

    function formatDate(dateString) {
        return moment(dateString).format('DD/MM/YYYY - HH:mm:ss');
    }
    function birthDayDate(dateString) {
        return moment(dateString).format('DD/MM/YYYY');
    }

    if (!userDetails) {
        return <p>Loading...</p>;
    }

    return (
        <>

            <Dashboard />
            <Navbar />

            <div className=' mt-[6rem] ml-[18rem] mr-8 mb-10 border border-2 h-fit'>
                <p className='custom-form p-2 mb-2'>{userDetails.name.toUpperCase()} DETAILS</p>
                <div className='flex'>
                    <div className='w-1/3 pl-3 pt-3'>
                        <form >
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Id</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="number"
                                    placeholder="Id"
                                    value={userDetails?.id}
                                />
                            </div>

                            <div className='user-detail-row'>
                                <label className="user-detail-label">Name</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="User Name"
                                    value={userDetails?.name}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Email</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="email"
                                    placeholder="User Email"
                                    value={userDetails?.email}
                                />
                            </div >
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Birthday</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="User Birthday"
                                    value={birthDayDate(userDetails?.birthday)}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Phone Number</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="User Phone Number"
                                    value={userDetails?.phno}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Gender</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="User Gender"
                                    value={userDetails?.gender}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Education</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="User Education Details"
                                    value={userDetails?.education}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Blood Group</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="User Blood Group"
                                    value={userDetails?.bloodGroup}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Country</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="Country"
                                    value={userDetails?.country}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Joined</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="User joined date"
                                    value={formatDate(userDetails?.joined)}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Visibility</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="Visibility"
                                    value={userDetails?.visibility}
                                />
                            </div>
                            <div className='user-detail-row'>
                                <label className="user-detail-label">Occupation</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="Occupation"
                                    value={userDetails?.occupation}
                                />
                            </div>

                            <div className='user-detail-row'>
                                <label className="user-detail-label">Hobbies</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="Hobbies "
                                    value={userDetails?.hobbies}
                                />
                            </div>
                        </form>
                    </div>

                    <div className='flex-col w-2/3 pl-3 pt-3 pr-3 ml-12'>
                        <div className='user-detail-row'>
                            <label className="user-detail-label w-20">About Me</label>
                            <input
                                className="border border-2 user-detail-input"
                                type="text"
                                placeholder="About me "
                                value={userDetails?.aboutMe}
                            />
                        </div>
                        <div className='user-detail-row'>
                            <label className="user-detail-label w-20">Profile</label>
                            <input
                                className="border border-2 user-detail-input"
                                type="text"
                                placeholder="Profile image path "
                                value={userDetails?.profileImagePath}
                            />
                        </div>
                        <div className='user-detail-row'>
                            <label className="user-detail-label w-20">Banner</label>
                            <input
                                className="border border-2 user-detail-input"
                                type="text"
                                placeholder="Banner image path"
                                value={userDetails?.bannerImagePath}
                            />
                        </div>
                        <div className="pb-5">
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <DataTable value={userDetails?.interests} className="datatable-basic custom-header ">
                                    <Column field="id" header="ID" className="border border-gray-300 px-2" />
                                    <Column field="activity" header="Activity" className="border border-gray-300 px-2" />
                                </DataTable>
                            </div>
                        </div>
                        <div className="pb-5">
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <DataTable
                                    className="datatable-basic custom-header"
                                    value={Object.entries(userDetails.socialMediaLinks)
                                        .filter(([key]) => key !== 'id')
                                        .map(([platform, link]) => ({ platform, link }))}
                                    responsiveLayout="scroll"
                                >
                                    <Column
                                        field="platform"
                                        header="Platform"
                                        className="border border-gray-300 px-2 capitalize"
                                    />
                                    <Column
                                        field="link"
                                        header="Link"
                                        className="border border-gray-300 px-2"
                                    />
                                </DataTable>
                            </div>
                        </div>
                        <div className="pb-5">
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <DataTable value={userDetails?.workExperience} className="datatable-basic custom-header ">
                                    <Column field="id" header="ID" className="border border-gray-300 px-2" />
                                    <Column field="work" header="Work" className="border border-gray-300 px-2" />
                                    <Column field="experience" header="Experience" className="border border-gray-300 px-2" />
                                </DataTable>
                            </div>
                        </div>

                        {/* <button
                            className="p-2 bg-cta hover:bg-opacity-90 rounded-md text-white float-right mb-3"
                            type="submit"
                        >
                            Save
                        </button>
                        <button
                            className="p-2 mr-2 bg-blue-600 hover:bg-opacity-90 rounded-md text-white float-right mb-3"
                            type="submit"
                        >
                            Edit
                        </button> */}
                    </div>
                </div>



            </div>
        </>
    );
};

export default UserDetails;
