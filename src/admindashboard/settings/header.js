import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import Navbar from "../navbar";
import axios from "axios";

const Header = () => {

  const [header, setHeader] = useState({
    homeIcon: "",
    friendRequestIcon: "",
    notificationIcon: "",
    messageIcon: "",
    widgetIcon: "",
    settingsIcon: "",
    searchIcon: "",
    headerColor: "",
    iconColor: "",
    logoImage: ""
  }
  );
  const [file, setFile] = useState();

  const fetchHeader = async () => {
    try {
      const response = await axios.get('http://localhost:8080/settings/header/HEADER');
      setHeader(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHeader();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeader((prevHeader) => ({
      ...header,
      [name]: value
    }))
  };

  const updateHeader = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("homeIcon", header.homeIcon);
    formData.append("friendRequestIcon", header.friendRequestIcon);
    formData.append("notificationIcon", header.notificationIcon);
    formData.append("messageIcon", header.messageIcon);
    formData.append("widgetIcon", header.widgetIcon);
    formData.append("settingsIcon", header.settingsIcon);
    formData.append("searchIcon", header.searchIcon);
    formData.append("headerColor", header.headerColor);
    formData.append("iconColor", header.iconColor);
    formData.append("logoImage", file); // Attach the actual file object

    try {
      const response = await axios.put('http://localhost:8080/settings/update/header/HEADER', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        fetchHeader(); // Reload updated data
        alert("Header updated successfully");
      } else {
        alert("Failed to update header");
      }
    } catch (error) {
      console.error("Error updating header:", error);
      alert("An error occurred while updating the header");
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the file object
    }
  };



  return (
    <>
      <Dashboard />
      <Navbar />

      <form className="contact-us-form" onSubmit={updateHeader} >

        <div className="contact-us-row">
          <label className="contact-us-label">Home</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Home icon path"
            value={header?.homeIcon}
            name="homeIcon"
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Friend Request</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Friend Request icon path"
            value={header.friendRequestIcon}
            name="friendRequestIcon"
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Notification</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Notification icon path"
            value={header.notificationIcon}
            onChange={handleChange}
            name="notificationIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Widget</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Widget icon path"
            value={header.widgetIcon}
            onChange={handleChange}
            name="widgetIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Settings</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Settings icon path"
            value={header.settingsIcon}
            onChange={handleChange}
            name="settingsIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Search</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Search icon path"
            value={header.searchIcon}
            onChange={handleChange}
            name="searchIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Message</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Message icon path"
            value={header.messageIcon}
            onChange={handleChange}
            name="messageIcon"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Header Color</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Header color code"
            value={header.headerColor}
            onChange={handleChange}
            name="headerColor"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Icon Color</label>
          <input
            className="contact-us-input"
            type="text"
            placeholder="Icon color code"
            value={header.iconColor}
            onChange={handleChange}
            name="iconColor"
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Logo</label>
          <input
            className="contact-us-input"
            type="file"
            onChange={handleImageChange}
          />
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

export default Header;