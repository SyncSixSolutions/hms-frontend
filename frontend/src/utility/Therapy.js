import api from './axiosInstance';

export const getAllTherapies = () => api.get('/therapies');
export const getTherapyById = (id) => api.get(`/therapies/${id}`);
export const addTherapy = (data) => api.post('/therapies', data);
export const updateTherapy = (id, data) => api.put(`/therapies/${id}`, data);
export const deleteTherapy = (id) => api.delete(`/therapies/${id}`);