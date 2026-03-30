import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const propertyService = {
  getAllProperties: () => axios.get(`${API_BASE_URL}/properties`),
  getPropertyById: (id) => axios.get(`${API_BASE_URL}/properties/${id}`),
  createProperty: (data) => {
    // If data is FormData (for file uploads), don't set Content-Type header
    if (data instanceof FormData) {
      return axios.post(`${API_BASE_URL}/properties`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return axios.post(`${API_BASE_URL}/properties`, data);
  },
  updateProperty: (id, data) => {
    if (data instanceof FormData) {
      return axios.put(`${API_BASE_URL}/properties/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return axios.put(`${API_BASE_URL}/properties/${id}`, data);
  },
  deleteProperty: (id) => axios.delete(`${API_BASE_URL}/properties/${id}`),
};

export default propertyService;
