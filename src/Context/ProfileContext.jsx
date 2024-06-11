import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { addDeliveryPerson, apiBaseUrl, getProfileById } from '../Contants/api';

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiBaseUrl}${getProfileById}3`);
      if (response?.data) {
        setProfileData(response.data);
      } else {
        setProfileData(null);
        setError('No data found');
      }
    } catch (error) {
      setProfileData(null);
      setError(error.message || 'An error occurred');
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

  const addDeliveryPerson = async (personData) => {
    try {
      const response = await axios.post(`${apiBaseUrl}${addDeliveryPerson}`, personData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to add delivery person');
    }
  };

  return (
    <ProfileContext.Provider value={{ profileData, loading, error, refreshProfileData, addDeliveryPerson }}>
    {children}
  </ProfileContext.Provider>
  );
};
