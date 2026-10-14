import axios from 'axios';

/**
 * Production-level Axios Service
 * - Secure Cookie-based Authentication (No LocalStorage)
 * - Global Error Handling
 * - Automatic Response Normalization
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:7000/api/v2";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
  timeout: 20000, // 20-second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Common Response Unwrapper
 * Most backend responses are wrapped in { data: { data: ... } } or { data: ... }
 */
const unwrapResponse = (response) => response?.data?.data ?? response?.data;

/**
 * RESPONSE INTERCEPTOR
 * Centralized error handling and response normalization
 */
apiClient.interceptors.response.use(
  (response) => {
    // Automatically unwrap for all API calls
    return unwrapResponse(response);
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    const message = error.response?.data?.message || error.message || "An unexpected system error occurred";

    // GLOBAL ERROR HANDLING
    if (status === 401) {
      console.warn("[AUTH] Session expired or unauthorized.");
      // We could trigger a global event here if needed, but AuthContext will handle state
    }

    if (status === 500) {
      console.error("[SERVER] Internal system failure.");
    }

    // Standardized Error Object for production
    return Promise.reject({
      status,
      message,
      originalError: error,
      response: error.response,
    });
  }
);

/* --- EXPORTED API METHODS --- */

export const registerUser = async (registrationData) => {
  return await apiClient.post("/user/register", registrationData);
};

export const loginUser = async (credentials) => {
  return await apiClient.post("/user/login", credentials);
};

export const logoutUser = async () => {
  return await apiClient.post("/user/logout");
};

export const sendMessage = async ({ message, chatId }) => {
  const endpoint = chatId ? `/chat/${chatId}` : "/chat";
  return await apiClient.post(endpoint, { message });
};

export const getCurrentUser = async () => {
  return await apiClient.get("/user/me");
};

export const getUserChats = async () => {
  return await apiClient.get("/chat");
};

export const getChatMessages = async (chatId) => {
  return await apiClient.get(`/chat/${chatId}`);
};

export default apiClient;
