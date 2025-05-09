// services/userService.ts

import api from "./api";

export interface User {
  id: number;
  name: string;
  email?: string;
  roleId: number;
  isActive: boolean;
  role: {
    id: number;
    label: string;
    level: number;
  };
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  roleId?: number;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export const getUsers = () => api.get("/users/getUsers");

export const getUsersByStatus = (isActive: boolean) =>
  api.get("/users/getUsersByStatus", { params: { isActive } });

export const getUser = (id: number) => api.get(`/users/getUserById/${id}`);

export const createUser = (data: CreateUserDto) => api.post("/users/createUser", data);

export const updateUser = (id: number, data: UpdateUserDto) =>
  api.put(`/users/updateUser/${id}`, data);

export const disableUser = (id: number) => api.delete(`/users/disableUser/${id}`);

export const restoreUser = (id: number) => api.put(`/users/restoreUser/${id}`);

export const deleteUser = (id: number) => api.delete(`/users/deleteUser/${id}`);
