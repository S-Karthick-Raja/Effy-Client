import axios from 'axios';
import { API_URL } from '../config/constant';

export const backend = axios.create({
    baseURL: API_URL,
});
