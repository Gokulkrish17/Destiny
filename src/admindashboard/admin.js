import React from 'react';

const AdminHealthChecker = () => {
    return (
        <>
            <iframe
                className='h-screen'
                src="http://localhost:8097"  // URL of the Spring Boot Admin Server
                width="100%"
                title="Spring Boot Admin"
                frameBorder="0" 
            ></iframe>
        </>
    );
}

export default AdminHealthChecker;
