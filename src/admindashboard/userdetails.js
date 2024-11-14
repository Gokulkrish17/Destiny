import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './dashboard';

const UserDetails = () => {
    const { email } = useParams(); // Get the email from the URL
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/getBy-email?email=${email}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [email]);

    if (!userDetails) {
        return <p>Loading...</p>;
    }

    return (
        <>

            <Dashboard/> 

        <div className="user-details-container">
            <header className="user-details-header">
                <h1><b>User Details</b></h1>
            </header>

            <main className="user-details-grid">
                <div className="user-details-column">
                    <p><strong>Id:</strong> {userDetails.id}</p>
                    <p><strong>User Id:</strong> {userDetails.userid}</p>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>About Me:</strong> {userDetails.aboutMe}</p>
                    <p><strong>Birthday:</strong> {userDetails.birthday}</p>
                    <p><strong>Phone Number:</strong> {userDetails.phno}</p>
                </div>
                <div className="user-details-column">
                    <p><strong>Gender:</strong> {userDetails.gender}</p>
                    <p><strong>Occupation:</strong> {userDetails.occupation}</p>
                    <p><strong>Blood Group:</strong> {userDetails.bloodGroup}</p>
                    <p><strong>Country:</strong> {userDetails.country}</p>
                    <p><strong>Joined:</strong> {userDetails.joined}</p>
                    <p><strong>Hobbies:</strong> {userDetails.hobbies}</p>
                    <p><strong>Education:</strong> {userDetails.education}</p>
                </div>
            </main>

            <section className="user-details-interests">
                <h3><b>Interest :</b></h3>
                <ul>
                    {userDetails.interests && userDetails.interests.length > 0 ? (
                        userDetails.interests.map((interest) => (
                            <li key={interest.id}>{interest.activity}</li>
                        ))
                    ) : (
                        <p>No interests found.</p>
                    )}
                </ul>
            </section>

            <footer className="user-details-footer">
                <h3><b>Work Experience:</b></h3>
                <ul>
                    {userDetails.workExperience && userDetails.workExperience.length > 0 ? (
                        userDetails.workExperience.map((experience) => (
                            <li key={experience.id}><b>{experience.work}</b> - {experience.experience}</li>
                        ))
                    ) : (
                        <p>No experience found.</p>
                    )}
                </ul>
            </footer>
        </div>
        </>
    );
};

export default UserDetails;
