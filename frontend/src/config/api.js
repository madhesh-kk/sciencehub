// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    orders: `${API_BASE_URL}/api/orders`,
  }
};

export default apiConfig;
