// Import API base URL from environment variables

// Uncomment to use environment variable for base URL
// export const apiBaseUrl = API_BASE_URL;

// Base API URLs for different services
export const apiBaseUrl =
  "https://ld63z6xh7gly.share.zrok.io";

// Order Endpoints
export const getAllNewOrders = "/orderAssignments/newOrders/";
export const getAllActiveOrders = "/orderAssignments/activeOrders/";
export const updateNewOrdersStatus = "/orderAssignments/status/";
export const getOrderHistory = "/orderAssignments/workHistory/3";


// Authentication Endpoints
export const signup = "api/auth/v1/signup";
export const signin = "api/auth/v1/signin";

// Profile Endpoints
export const getProfileById = "/api/v1/delivery/profile/";
export const addDeliveryPerson = "/api/v1/delivery/";
export const updateProfileById = "/api/v1/delivery/update/";



// Online/Offline Endpoints
export const updateStatusByProfileId = "/api/v1/delivery/";




