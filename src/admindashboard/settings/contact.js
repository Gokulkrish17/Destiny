import { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import Navbar from "../navbar";
import axios from "axios";

const ContactUs = () => {

  const [contact, setContact] = useState({
    companyName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const fetchContact = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/settings/get-contact-details/CONTACT_US"
      );
      setContact(response.data);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const updateContact = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/settings/update-contact/CONTACT_US`,
        null,
        {
          params: {
            companyName: contact.companyName,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
          }
        }
      );

      if (response.status === 200) {
        alert("Contact details updated successfully!");
        fetchContact();
      }
    } catch (error) {
      console.error("Error updating contact details:", error);
      alert("Failed to update contact details. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  return (
    <>
      <Dashboard />
      <Navbar />

      <form className="contact-us-form" onSubmit={updateContact}>
        <div className="contact-us-row">
          <label className="contact-us-label">Company Name</label>
          <input
            className="contact-us-input"
            type="text"
            name="companyName"
            placeholder="Company name"
            value={contact.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Address</label>
          <input
            className="contact-us-input"
            type="text"
            name="address"
            placeholder="Company address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Contact Number</label>
          <input
            className="contact-us-input"
            type="number"
            name="phoneNumber"
            placeholder="Company phone number"
            value={contact.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="contact-us-row">
          <label className="contact-us-label">Email Address</label>
          <input
            className="contact-us-input"
            type="email"
            name="email"
            placeholder="Company email address"
            value={contact.email}
            onChange={handleChange}
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
  );
};

export default ContactUs;
