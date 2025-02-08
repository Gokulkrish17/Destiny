import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Common/dashboard';
import Navbar from '../Common/navbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';
import { Clipboard } from "lucide-react"; // Importing the clipboard icon
import { FaRegCopy } from "react-icons/fa";


const UserDetails = () => {
    const { email } = useParams(); // Get the email from the URL
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('PROFILE');
    const [posts, setPosts] = useState([]);
    const [friendLists, setFriendLists] = useState([]);
    const [pendingLists, setPendingLists] = useState([]);
    const [sentLists, setSentLists] = useState([]);
    const [status, setStatus] = useState([]);
    const token = localStorage.getItem('token');

    const fetchUserDetails = useCallback(async () => {
        try {
            const response = await axios.get(`https://192.168.1.29:8080/api/users/getBy-email?email=${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserDetails(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }, [email, token]);

    const fetchPosts = useCallback(async () => {
        if (!userDetails?.userid) return;
        try {
            const response = await axios.get(`https://192.168.1.29:8080/aggregate-media/post/user/${userDetails?.userid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [userDetails?.userid, token]);

    const fetchPendingList = useCallback(async () => {
        if (!userDetails?.userid) return;
        try {
            const response = await axios.get(`https://192.168.1.29:8080/friend-requests/${userDetails?.userid}/pending-requests`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPendingLists(response.data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [userDetails?.userid, token]);

    const fetchSendList = useCallback(async () => {
        if (!userDetails?.userid) return;
        try {
            const response = await axios.get(`https://192.168.1.29:8080/friend-requests/${userDetails?.userid}/sent-requests`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSentLists(response.data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [userDetails?.userid, token]);

    const fetchFriendList = useCallback(async () => {
        if (!userDetails?.userid) return;
        try {
            const response = await axios.get(`https://192.168.1.29:8080/friend-requests/${userDetails?.userid}/friends`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFriendLists(response.data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [userDetails?.userid, token]);

    const fetchStatus = useCallback(async () => {
        if (!userDetails?.userid) return;
        try {
            const response = await axios.get(`https://192.168.1.29:8080/statuses/user/${userDetails?.userid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStatus(response.data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [userDetails?.userid, token]);


    useEffect(() => {
        fetchUserDetails();
    }, [email, fetchUserDetails]);

    useEffect(() => {
        fetchPosts();
    }, [userDetails?.userid, fetchPosts]);

    useEffect(() => {
        fetchPendingList();
    }, [userDetails?.userid, fetchPendingList]);

    useEffect(() => {
        fetchSendList();
    }, [userDetails?.userid, fetchSendList]);

    useEffect(() => {
        fetchFriendList();
    }, [userDetails?.userid, fetchFriendList]);

    useEffect(() => {
        fetchStatus();
    }, [userDetails?.userid, fetchStatus]);


    function formatDate(dateString) {
        return moment(dateString).format('DD/MM/YYYY - HH:mm:ss');
    }
    function birthDayDate(dateString) {
        return moment(dateString).format('DD/MM/YYYY');
    }

    const personalPath = `/user/${email}/detail`;
    const professionalPath = `/artist/${userDetails?.userid}/detail`;

    const isPersonalActive = location.pathname === personalPath;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Image path copied successfully"); // Optional alert (can be removed)
    };

    const copyToClipboard1 = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied to clipboard: " + text))
            .catch(err => console.error("Failed to copy text: ", err));
    };


    if (!userDetails) {
        return (
            <>
                <Dashboard />
                <p className='mt-[6rem] ml-[18rem] mr-8 mb-10 h-fit text-lg'>User Details not found....!</p>
            </>
        )
    }

    const sections = [
        "PROFILE",
        "TIMELINE",
        "FRIENDS",
        "PHOTOS",
        "VIDEOES",
        "STORIES",
        "FOLLOWING",
        "FOLLOWERS",
        "NOTIFICATION",
        "MESSAGE"
    ]

    return (
        <>

            <Dashboard />
            <Navbar />
            <div className="flex items-center text-sm font-medium text-gray-500 mt-[6rem] ml-[18.1rem] mr-8">
                <span>Menu</span>
                <span className="mx-2 text-gray-400">&gt;</span>
                <span className="text-gray-500">User</span>
                <span className="mx-2 text-gray-400">&gt;</span>
                <span
                    className="text-gray-500 cursor-pointer"
                    onClick={() => navigate('/userlist')}
                >
                    Userlist
                </span>
                <span className="mx-2 text-gray-400">&gt;</span>
                <span className="text-gray-300">{userDetails?.name}</span>
            </div>

            <div className=' mt-[1rem] ml-[18rem] mr-8 mb-10 border border-2 h-fit'>
                <ul className='custom-form p-2 mb-2 flex space-x-12'>

                    {sections.map((section) => (
                        <li key={section} className={`hover:text-gray-300 ${activeTab === section ? "text-gray-600" : ""}`} onClick={() => setActiveTab(section)}>

                            {section}

                        </li>
                    ))}

                </ul>
                {activeTab === "PROFILE" && (
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
                                        readOnly
                                    />
                                </div>

                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Name</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="User Name"
                                        value={userDetails?.name}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Email</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="email"
                                        placeholder="User Email"
                                        value={userDetails?.email}
                                        readOnly
                                    />
                                </div >
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Birthday</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="User Birthday"
                                        value={birthDayDate(userDetails?.birthday)}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Phone Number</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="User Phone Number"
                                        value={userDetails?.phno}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Gender</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="User Gender"
                                        value={userDetails?.gender}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Education</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="User Education Details"
                                        value={userDetails?.education}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Blood Group</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="User Blood Group"
                                        value={userDetails?.bloodGroup}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Country</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="Country"
                                        value={userDetails?.country}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Joined</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="User joined date"
                                        value={formatDate(userDetails?.joined)}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Visibility</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="Visibility"
                                        value={userDetails?.visibility}
                                        readOnly
                                    />
                                </div>
                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Occupation</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="Occupation"
                                        value={userDetails?.occupation}
                                        readOnly
                                    />
                                </div>

                                <div className='user-detail-row'>
                                    <label className="user-detail-label">Hobbies</label>
                                    <input
                                        className="border border-2 user-detail-input"
                                        type="text"
                                        placeholder="Hobbies "
                                        value={userDetails?.hobbies}
                                        readOnly
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col w-2/3 pl-3 pt-3 pr-3 ml-12 space-y-4">
                            <div className="flex space-x-10">
                                {/* Profile Section */}
                                <div className="flex flex-col items-center">
                                    <label className="w-[9rem] text-center">Profile</label>
                                    <Clipboard
                                        className="cursor-pointer text-gray-500 hover:text-black mt-1"
                                        size={20}
                                        onClick={() => copyToClipboard(`https:192.168.1.29:8080${userDetails?.profileImagePath || 'default-image-url'}`)}
                                    />
                                    <img
                                        className="border border-2 w-[10rem] h-[10rem] object-cover rounded mt-2"
                                        src={`https:192.168.1.29:8080${userDetails?.profileImagePath || 'default-image-url'}`}
                                        alt="Profile"
                                    />
                                </div>

                                {/* Banner Section */}
                                <div className="flex flex-col items-center">
                                    <label className="w-[9rem] text-center">Banner</label>
                                    <Clipboard
                                        className="cursor-pointer text-gray-500 hover:text-black mt-1"
                                        size={20}
                                        onClick={() => copyToClipboard(`https:192.168.1.29:8080${userDetails?.bannerImagePath || 'default-image-url'}`)}
                                    />
                                    <img
                                        className="border border-2 w-[18rem] h-[10rem] object-cover rounded mt-2"
                                        src={`https:192.168.1.29:8080${userDetails?.bannerImagePath || 'default-image-url'}`}
                                        alt="Banner"
                                    />
                                </div>
                                {/* Toggle Buttons Section */}
                                <div className="flex flex-col items-center">
                                    <label className="w-[9rem] text-center">Switch</label>
                                    <div className="flex space-x-4 mt-16">
                                        <button
                                            className={`px-4 py-2 rounded-lg font-medium transition ${isPersonalActive ? "bg-green-600 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
                                                }`}
                                            onClick={() => navigate(personalPath)}
                                        >
                                            Personal Details
                                        </button>
                                        <button
                                            className={`px-4 py-2 rounded-lg font-medium transition ${!isPersonalActive ? "bg-green-600 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
                                                }`}
                                            onClick={() => navigate(professionalPath)}
                                        >
                                            Professional Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='user-detail-row'>
                                <label className="user-detail-label w-20">About Me</label>
                                <input
                                    className="border border-2 user-detail-input"
                                    type="text"
                                    placeholder="About me "
                                    value={userDetails?.aboutMe}
                                    readOnly
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

                        </div>
                    </div>
                )}
                {activeTab === "TIMELINE" && (
                    <div className="p-10 ">
                        <DataTable value={posts} className="datatable-basic custom-header border border-gray-300 rounded-lg overflow-hidden">
                            <Column
                                field="postResponseDTO.postId"
                                header="Post Id"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                            />
                            <Column
                                header="Path"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => (
                                    rowData.postResponseDTO?.postType === "IMAGE"
                                        ? `https://192.168.1.29:8080/api/users${rowData.postResponseDTO.imageUrl}`
                                        : rowData.postResponseDTO?.postType === "VIDEO"
                                            ? `https://192.168.1.29:8080/api/users${rowData.postResponseDTO.videoUrl}`
                                            : "Null"
                                )}
                            />

                            <Column
                                field="postResponseDTO.createdAt"
                                header="Created At"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => formatDate(rowData.postResponseDTO.createdAt || "Null")}
                            />
                            <Column
                                field="postResponseDTO.postType"
                                header="Type"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => rowData.postResponseDTO.postType || "Null"}
                            />
                            <Column
                                field="likeDTO.likesCount"
                                header="Likes Count"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                            />
                            <Column
                                field="commentResponses.likeCount"
                                header="Comments Count"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => rowData.commentResponses?.likeCount || "Null"}
                            />
                            <Column
                                header="Copy"
                                className="border border-gray-300 px-2 "
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => (
                                    <FaRegCopy
                                        className="cursor-pointer text-blue-500"
                                        onClick={() => copyToClipboard(`https://192.168.1.29/api/users${rowData.postResponseDTO.imageUrl}` || `https://192.168.1.29:8080/api/users${rowData.postResponseDTO.videoUrl}` || "Null")}
                                    />
                                )}
                            />
                        </DataTable>
                    </div>

                )}

                {activeTab === "FRIENDS" && (
                    <div className="p-10 flex justify-between">
                        {/* Friend List Table */}
                        <div className='text-center'>
                            <h2 className="text-xl font-bold mt-6 mb-4">Friend List</h2>
                            <DataTable value={friendLists?.friends || []} className="datatable-basic custom-header border border-gray-300 rounded-lg overflow-hidden">
                                <Column field="id" header="ID" className="border border-gray-300 p-2" />
                                <Column field="name" header="Name" className="border border-gray-300 px-2" />
                                <Column
                                    header="Copy"
                                    className="border border-gray-300 px-2 text-center"
                                    body={(rowData) => (
                                        <FaRegCopy
                                            className="cursor-pointer text-blue-500"
                                            onClick={() => copyToClipboard1(`https://192.168.1.29/api/users${rowData.profileImagePath}`)}
                                        />
                                    )}
                                />
                            </DataTable>
                        </div>

                        <div className='text-center'>
                            {/* Pending List Table */}
                            <h2 className="text-xl font-bold mt-6 mb-4">Pending List</h2>
                            <DataTable value={pendingLists?.pendingRequests || []} className="datatable-basic custom-header border border-gray-300 rounded-lg overflow-hidden">
                                <Column field="senderId" header=" ID" className="border border-gray-300 px-2" />
                                <Column field="senderName" header=" Name" className="border border-gray-300 px-2" />
                                <Column
                                    header="Copy"
                                    className="border border-gray-300 px-2 text-center"
                                    body={(rowData) => (
                                        <FaRegCopy
                                            className="cursor-pointer text-blue-500"
                                            onClick={() => copyToClipboard(`https://192.168.1.29/api/users${rowData.senderImagePath}`)}
                                        />
                                    )}
                                />
                            </DataTable>
                        </div>

                        <div className='text-center'>
                            {/* Sent List Table */}
                            <h2 className="text-xl font-bold mt-6 mb-4">Sent List</h2>
                            <DataTable value={sentLists?.sentRequests || []} className="datatable-basic custom-header border border-gray-300 rounded-lg overflow-hidden">
                                <Column field="recipientId" header=" ID" className="border border-gray-300 px-2" />
                                <Column field="recipientName" header=" Name" className="border border-gray-300 px-2" />
                                <Column
                                    header="Copy"
                                    className="border border-gray-300 px-2 text-center"
                                    body={(rowData) => (
                                        <FaRegCopy
                                            className="cursor-pointer text-blue-500"
                                            onClick={() => copyToClipboard(`https://192.168.1.29/api/users${rowData.recipientImagePath}`)}
                                        />
                                    )}
                                />
                            </DataTable>
                        </div>

                    </div>
                )}

                {activeTab === "PHOTOS" && (
                    <div className="p-10">
                        <DataTable
                            value={posts.filter(post => post.postResponseDTO.postType === "IMAGE")}
                            className="datatable-basic custom-header border border-gray-300 rounded-lg overflow-hidden"
                        >
                            <Column
                                field="postResponseDTO.postId"
                                header="Post Id"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                            />
                            <Column
                                header="Path"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => `https://192.168.1.29:8080/api/users${rowData.postResponseDTO.imageUrl}` || "Null"}
                            />
                            <Column
                                field="postResponseDTO.createdAt"
                                header="Created At"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => formatDate(rowData.postResponseDTO.createdAt || "Null")}
                            />
                            <Column
                                field="likeDTO.likesCount"
                                header="Likes Count"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                            />
                            <Column
                                field="commentResponses.likeCount"
                                header="Comments Count"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => rowData.commentResponses?.likeCount || "Null"}
                            />
                            <Column
                                header="Copy"
                                className="border border-gray-300 px-2 "
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => (
                                    <FaRegCopy
                                        className="cursor-pointer text-blue-500"
                                        onClick={() => copyToClipboard(`https://192.168.1.29:8080/api/users${rowData.postResponseDTO.imageUrl}`)}
                                    />
                                )}
                            />
                        </DataTable>
                    </div>
                )}

                {activeTab === "VIDEOES" && (
                    <div className="p-10">
                        <DataTable
                            value={posts.filter(post => post.postResponseDTO.postType === "VIDEO")}
                            className="datatable-basic custom-header border border-gray-300 rounded-lg overflow-hidden"
                        >
                            <Column
                                field="postResponseDTO.postId"
                                header="Post Id"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                            />
                            <Column
                                header="Path"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => `https://192.168.1.29:8080/api/users${rowData.postResponseDTO.videoUrl}` || "Null"}
                            />
                            <Column
                                field="postResponseDTO.createdAt"
                                header="Created At"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => formatDate(rowData.postResponseDTO.createdAt || "Null")}
                            />
                            <Column
                                field="likeDTO.likesCount"
                                header="Likes Count"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                            />
                            <Column
                                field="commentResponses.likeCount"
                                header="Comments Count"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => rowData.commentResponses?.likeCount || "Null"}
                            />
                            <Column
                                header="Copy"
                                className="border border-gray-300 px-2 "
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => (
                                    <FaRegCopy
                                        className="cursor-pointer text-blue-500"
                                        onClick={() => copyToClipboard(`https://192.168.1.29:8080/api/users${rowData.postResponseDTO.videoUrl}`)}
                                    />
                                )}
                            />
                        </DataTable>
                    </div>
                )}

                {activeTab === "STORIES" && (
                    <div className="p-10">
                        <DataTable value={status} className="datatable-basic custom-header border border-gray-300 rounded-lg overflow-hidden">
                            <Column
                                header="Status Id"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => rowData.id}
                            />

                            <Column
                                header="Path"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => rowData.type === "IMAGE" ? `https://192.168.1.29:8080/api/users${rowData.content}` : "Null"}
                            />

                            <Column
                                field="createdAt"
                                header="Created At"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => formatDate(rowData.createdAt || "Null")}
                            />

                            <Column
                                header="Copy"
                                className="border border-gray-300 px-2"
                                headerStyle={{ textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: "normal" }}
                                body={(rowData) => (
                                    rowData.type === "IMAGE" ? (
                                        <FaRegCopy
                                            className="cursor-pointer text-blue-500"
                                            onClick={() => copyToClipboard(`https://192.168.1.29:8080/api/users${rowData.content}`)}
                                        />
                                    ) : null
                                )}
                            />
                        </DataTable>

                    </div>
                )}

            </div>
        </>
    );
};

export default UserDetails;
