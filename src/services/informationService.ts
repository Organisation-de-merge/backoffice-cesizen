import api from "./api";

export interface PagesInterface {
  status?: string; 
  page?: number;
  limit?: number;
  query?: string;
}

export const getPages = (params?: PagesInterface) => api.get("/pages", { params });

export const getPage = (id: number) => api.get(`/pages/${id}`);

export const createPage = (data: FormData) =>
  api.post("/pages/createPage", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updatePage = (id: number, data: FormData) =>
  api.put(`/pages/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deletePage = (id: number) => api.delete(`/pages/${id}`);