import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl,getProfileById } from '../Contants/api';
const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}${getProfileById}3`);
      setProfileData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const refreshProfileData = () => {
    fetchProfileData();
  };

  return (
    <ProfileContext.Provider value={{ profileData, loading, error, refreshProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
