import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../Common/dashboard";
import Navbar from "../Common/navbar";

const AdminDetails = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode
  const { email } = useParams();
  const navigate = useNavigate();

  // Fetch user data
  const fetchUserLoggedInData = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/get-profile/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  // Handle Edit Button Click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    try {
      // Construct URL with query parameters using userData state
      const url = `http://localhost:8080/api/admin/request-reset/${userData?.id}?email=${encodeURIComponent(userData.email)}&newPassword=${encodeURIComponent(userData.password)}&name=${encodeURIComponent(userData.name)}&phoneNumber=${encodeURIComponent(userData.phoneNumber)}`;
  
      // Send the request with query parameters
      await axios.post(
        url,
        null, // No body required since data is in the URL
        {
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert("Details updated successfully!");
  
      // Fetch the updated data
      await fetchUserLoggedInData();
  
      // Exit edit mode after saving
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update details.");
    }
  };
  
  

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchUserLoggedInData();
  }, [fetchUserLoggedInData]);

  return (
    <>
      <Dashboard />
      <Navbar />

      <form className="contact-us-form">
      <div className="flex items-center text-sm font-medium text-gray-500 ml-1 mb-10">
          <span>Menu</span>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-500">Settings</span>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-500 cursor-pointer" onClick={() => navigate('/admin-profile')}>Admin User</span>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-300">{userData?.name}</span>
        </div>
        <div className="contact-us-row">
          <label className="contact-us-label">Name</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="User Name"
            name="name"
            value={userData?.name || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Password</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="New Password"
            name="password"
            value={userData?.password || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Email</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="User Email"
            name="email"
            value={userData?.email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Phone Number</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={userData?.phoneNumber || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        {isEditing ? (
          <button
            className="p-2 bg-cta hover:bg-opacity-90 rounded-md text-white float-right mb-3"
            type="button"
            onClick={handleSaveClick}
          >
            Save
          </button>
        ) : (
          <button
            className="p-2 mr-2 bg-blue-600 hover:bg-opacity-90 rounded-md text-white float-right mb-3"
            type="button"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
      </form>
    </>
  );
};

export default AdminDetails;
