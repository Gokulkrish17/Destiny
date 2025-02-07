import Dashboard from "../Common/dashboard";
import Navbar from "../Common/navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const SystemSettings = () => {

  const [setting, setSetting] = useState();

  const fetchSetting = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/settings/get-setting/1', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setSetting(response.data)
    } catch (error) {
      console.error(error);

    }
  }

  useEffect(() => {
    fetchSetting();
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSetting((prevChange) => ({
      ...setting,
      [name]: value
    }))
  }

  const color = JSON.stringify(setting?.color);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Convert setting object to JSON string
    formData.append("settingsDTO", JSON.stringify(setting));

    // Append file inputs
    const fileInputs = [
      "homeIcon",
      "friendRequestIcon",
      "notificationIcon",
      "messageIcon",
      "widgetIcon",
      "settingsIcon",
      "searchIcon",
      "logoImage",
    ];

    fileInputs.forEach((inputName) => {
      const fileInput = document.querySelector(`input[name="${inputName}"]`);
      if (fileInput?.files[0]) {
        formData.append(inputName, fileInput.files[0]);
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:8080/settings/update/1`, // Replace with dynamic ID if needed
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Settings updated successfully!");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings.");
    }
  };


  return (
    <>
      <Dashboard />
      <Navbar />

      <form className="contact-us-form" onSubmit={handleSubmit} >

      <div className="flex items-center text-sm font-medium text-gray-500 ml-1 mb-10">
          <span>Menu</span>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-500">Settings</span>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-300">System Settings</span>
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Home</label>
          <input
            className="contact-us-input"
            type="file"
            name="homeIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Friend Request</label>
          <input
            className="contact-us-input"
            type="file"
            name="friendRequestIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Notification</label>
          <input
            className="contact-us-input"
            type="file"
            name="notificationIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Widget</label>
          <input
            className="contact-us-input"
            type="file"
            name="widgetIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Settings</label>
          <input
            className="contact-us-input"
            type="file"
            name="settingsIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Search</label>
          <input
            className="contact-us-input"
            type="file"
            name="searchIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Message</label>
          <input
            className="contact-us-input"
            type="file"
            name="messageIcon"
          />
        </div>


        <div className="contact-us-row">
          <label className="contact-us-label">Logo</label>
          <input
            className="contact-us-input"
            type="file"
            name="logoImage"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Color</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Color code"
            name="color"
            value={color}
            onChange={handleOnChange}
          />
        </div>

        <div className="contact-us-row" >
          <label className="contact-us-label" >Footer</label>

          <input
            className="contact-us-input"
            type='text'
            name="footerContent"
            placeholder='Field to add in footer'
            value={setting?.footerContent}
            onChange={handleOnChange}
          />

        </div>




        <div className="contact-us-row">
          <label className="contact-us-label">Company Name</label>
          <input
            className="contact-us-input"
            type="text"
            name="companyName"
            placeholder="Company name"
            value={setting?.companyName}
            onChange={handleOnChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Address</label>
          <input
            className="contact-us-input"
            type="text"
            name="address"
            placeholder="Company address"
            value={setting?.address}
            onChange={handleOnChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Contact Number</label>
          <input
            className="contact-us-input"
            type="number"
            name="phoneNumber"
            placeholder="Company phone number"
            value={setting?.phoneNumber}
            onChange={handleOnChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Email Address</label>
          <input
            className="contact-us-input"
            type="email"
            name="email"
            placeholder="Company email address"
            value={setting?.email}
            onChange={handleOnChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">SocialMedia Links</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Company's social media links"
            name="socialMediaLinks"
            value={setting?.socialMediaLinks ? JSON.stringify(setting?.socialMediaLinks) : ''}
            onChange={handleOnChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">About us</label>
          <textarea rows={10} cols={100}
            placeholder="Enter text"
            className="contact-us-input"
            value={setting?.aboutUs}
            name="aboutUs"
            onChange={handleOnChange}></textarea>
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Privacy policy</label>
          <textarea rows={10} cols={100}
            placeholder="Enter text"
            className="contact-us-input"
            value={setting?.privacyPolicy}
            name="privacyPolicy"
            onChange={handleOnChange}
          ></textarea>
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Terms and Conditions</label>
          <textarea rows={10} cols={100}
            placeholder="Enter text"
            className="contact-us-input"
            value={setting?.termsAndConditions}
            name="termsAndConditions"
            onChange={handleOnChange}></textarea>
        </div>

        <button
          className="absolute bottom-8 right-8 p-2 bg-cta rounded-md text-white"
          type="submit"
        >
          Update
        </button>

      </form>
    </>
  )
};
export default SystemSettings;