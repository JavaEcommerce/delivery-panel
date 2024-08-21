import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { addDeliveryPerson, apiBaseUrl, getProfileById } from '../Contants/api';
import axiosInstance from '../Utils/useAxios';

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(profileData)

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${getProfileById}`);
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
      const response = await axiosInstance.post(`${addDeliveryPerson}`, personData);
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
