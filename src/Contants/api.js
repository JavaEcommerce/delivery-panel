



import { API_BASE_URL } from '@env'
// Base API URLs for different services
export const apiBaseUrl = 'https://bvzwr2c7mj3m.share.zrok.io';

// Order Endpoints
export const getAllNewOrders = "/orderAssignments/newOrders/";
export const getAllActiveOrders = "/orderAssignments/activeOrders/";
export const updateNewOrdersStatus = "/orderAssignments/status/";
export const getOrderHistory = "/orderAssignments/workHistory/3";
export const authenticateOTP = "/Otp/authenticateOTP";
export const getOrderDetail = "/orderAssignments/orderDetail/";

// Authentication Endpoints
export const signup = "api/auth/v1/signup";
export const signin = "api/auth/v1/signin";

// Profile Endpoints
export const getProfileById = "/api/v1/delivery/profile/";
export const addDeliveryPerson = "/api/v1/delivery/";
export const updateProfileById = "/api/v1/delivery/update/";


// Online/Offline Endpoints
export const updateStatusByProfileId = "/api/v1/delivery/";

// Bonus endpoint

export const getBonus = "/bonusPaymentHistory/";




