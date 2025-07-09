import api from "./api";

export interface ActivitiesInterface {
  status?: string; 
  page?: number;
  limit?: number;
  query?: string;
  typeId?: number;
  stressLevel?: number;
}

export const getActivities = (params?: ActivitiesInterface) => api.get("/activities", { params });

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