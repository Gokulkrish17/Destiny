import React from "react";

export const fetchUserdata = async (token) => {
    try {
      const response = await fetch('https:192.168.1.29:8080/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();

          console.error('Invalid data format:', data);
          return null;
      }
       else {
        console.error('Failed to fetch user profile:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };