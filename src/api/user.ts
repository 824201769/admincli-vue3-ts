import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  expire_in: number;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/v1/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get('/api/v1/userinfo');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
