import api from "./api";

export interface Menu {
  id: number;
  label: string;
  pageIds: number[];
}

export interface MenuWithPages extends Menu {
  pages: {
    id: number;
    title: string;
    content: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    thumbnail?: string;
  }[];
}

export const getMenus = () => api.get<Menu[]>("/menus");

export const getMenu = (id: number) => api.get<MenuWithPages>(`/menus/${id}`);

export const createMenu = (data: { label: string; pageIds: number[] }) =>
  api.post<Menu>("/menus/create", data);

export const updateMenu = (id: number, data: { label: string; pageIds: number[] }) =>
  api.put<Menu>(`/menus/${id}`, data);

export const deleteMenu = (id: number) => api.delete(`/menus/${id}`);
