import api from "./api";

export interface ActivityType {
  id: number;
  label: string;
}

export const getActivityTypes = () =>
  api.get<ActivityType[]>("/activity-types");

export const getActivityType = (id: number) =>
  api.get<ActivityType>(`/activity-types/${id}`);

export const createActivityType = (data: { label: string }) =>
  api.post<ActivityType>("/activity-types", data);

export const updateActivityType = (id: number, data: { label: string }) =>
  api.put<ActivityType>(`/activity-types/${id}`, data);

export const deleteActivityType = (id: number) =>
  api.delete(`/activity-types/${id}`);