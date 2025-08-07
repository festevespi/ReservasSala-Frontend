import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7249/api', // ajuste para a porta do seu backend
});

export default api;