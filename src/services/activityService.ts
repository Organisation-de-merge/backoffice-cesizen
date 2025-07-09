import api from "./api";

export interface ActivityQueryParams {
  id: number;
  name: string;
  description: string;
  duration: number;
  stressLevel: number;
  typeId: number;
  status: string;
  thumbnail?: string;
  publicationDate?: string;
}

export const getActivities = (params?: ActivityQueryParams) => api.get("/activities", { params });

export const getActivity = (id: number) => api.get(`/activities/${id}`);

export const createActivity = (data: FormData) =>
  api.post("/activities", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateActivity = (id: number, data: FormData) =>
  api.put(`/activities/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteActivity = (id: number) => api.delete(`/activities/${id}`);