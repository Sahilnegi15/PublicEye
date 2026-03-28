import axios from "axios";

const API = "http://localhost:8000";

export const uploadIssue = (formData, token) => {
  return axios.post(`${API}/issues/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getIssues = () => axios.get(`${API}/issues`);