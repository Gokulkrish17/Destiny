import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../dashboard";
import Navbar from "../navbar";

const LoginDetails = () => {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode
  const { email } = useParams();

  const navigate = useNavigate();

  // Fetch user data
  const fetchUserLoggedInData = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/get-profile/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  const fetchUserDetails = useCallback(async() => {
    const token = localStorage.getItem('token');
    try{
      const response = await axios.get(`http://localhost:8080/api/users/getBy-email?email=${email}`,{
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      setUser(response.data)
    }catch(error){
      console.error(error);
      
    }
  },[email]);

  // Handle Edit Button Click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    try {
      // Construct URL with query parameters using userData state
      const url = `http://localhost:8080/api/auth/request-reset/${userData.id}/${user?.userid}?email=${encodeURIComponent(userData.email)}&newPassword=${encodeURIComponent(userData.password)}&name=${encodeURIComponent(userData.name)}&phoneNumber=${encodeURIComponent(userData.phoneNumber)}`;
  
      // Send the request with query parameters
      await axios.post(
        url,
        null, // No body required since data is in the URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert("Details updated successfully!");
      navigate("/logged_user-profile")
  
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
    fetchUserDetails();
  }, [fetchUserLoggedInData,fetchUserDetails]);

  return (
    <>
      <Dashboard />
      <Navbar />

      <form className="contact-us-form">
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

export default LoginDetails;
