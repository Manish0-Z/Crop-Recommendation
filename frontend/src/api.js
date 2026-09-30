import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function predictCrop(features) {
  const response = await api.post('/predict', features);
  return response.data;
}
