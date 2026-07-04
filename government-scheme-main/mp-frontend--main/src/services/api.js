import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Update with your actual NLP backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecommendedSchemes = async (userData) => {
  try {
    const response = await api.post('/match-schemes', userData);
    return response.data;
  } catch (error) {
    console.error('Error fetching schemes:', error);
    throw error;
  }
};

export const getSchemeExplanation = async (schemeId, userId) => {
  try {
    const response = await api.get(`/explain/${schemeId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching explanation:', error);
    throw error;
  }
};

export const chatWithAI = async (messages, language = 'en') => {
  try {
    const response = await api.post('/chat', { messages, language });
    return response.data;
  } catch (error) {
    console.error('Error chatting with AI:', error);
    throw error;
  }
};

export default api;
