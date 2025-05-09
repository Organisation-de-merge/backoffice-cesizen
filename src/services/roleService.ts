import api from "./api";

export interface Role {
  id: number;
  label: string;
  level: number;
  deletedAt?: string | null;
  users?: {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    roleId: number;
  }[];
}

export const getRoles = () => api.get<Role[]>("/roles");

export const getRolesByStatus = (active: boolean) =>
  api.get<Role[]>(`/roles/${active ? "active" : "inactive"}`);

export const getRoleById = (id: number) => api.get<Role>(`/roles/${id}`);

export const createRole = (data: { label: string; level: number }) =>
  api.post("/roles", data);

export const updateRole = (
  id: number,
  data: { label?: string; level?: number }
) => api.put(`/roles/${id}`, data);

export const disableRole = (id: number) =>
  api.delete(`/roles/disableRole/${id}`);

export const restoreRole = (id: number) =>
  api.put(`/roles/restoreRole/${id}`);