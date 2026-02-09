import axios from 'axios';

// export const authApi = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });

// export const loginRequest = async (email: string, password: string) => {
//   const res = await authApi.post('/auth/login', {
//     email,
//     password,
//   });

//   return res.data;
// };


export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5000/api' : '/api',
  withCredentials: true,
});