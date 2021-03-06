import axios from "axios";

export const getHike = id => {
  return axios.get(`/api/hikes/${id}`);
};

export const getHikes = () => {
  return axios.get("/api/hikes");
};

export const getUserHikes = id => {
  return axios.get(`/api/hikes/user/${id}`);
};

export const writeHike = data => {
  return axios.post("/api/hikes/new", data);
};

export const updateHike = hike => {
  return axios.patch(`/api/hikes/${hike.id}`, hike);
};

export const deleteHike = id => {
  return axios.delete(`/api/hikes/${id}`);
};