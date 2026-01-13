import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

export const fetchItems = () => {
  return axios.get(API_URL);
};

export const createItem = (name, quantity) => {
  return axios.post(API_URL, { name, quantity });
};

export const updateQuantity = (id, quantity) => {
  return axios.patch(`${API_URL}/${id}/quantity`, { quantity });
};

export const deleteItem = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};