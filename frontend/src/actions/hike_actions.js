import { getHikes, getUserHikes, writeHike } from "../util/hike_api_util";

export const RECEIVE_HIKES = "RECEIVE_HIKES";
export const RECEIVE_USER_HIKES = "RECEIVE_USER_HIKES";
export const RECEIVE_NEW_HIKE = "RECEIVE_NEW_HIKE";

export const receiveHikes = hikes => ({
  type: RECEIVE_HIKES,
  hikes
});

export const receiveUserHikes = hikes => ({
  type: RECEIVE_USER_HIKES,
  hikes
});

export const receiveNewHike = hike => ({
  type: RECEIVE_NEW_HIKE,
  hike
});

export const fetchHikes = () => dispatch =>
  getHikes()
    .then(hikes => dispatch(receiveHikes(hikes)))
    .catch(err => console.log(err));

export const fetchUserHikes = id => dispatch =>
  getUserHikes(id)
    .then(hikes => dispatch(receiveUserHikes(hikes)))
    .catch(err => console.log(err));

export const createHike = data => dispatch =>
  writeHike(data)
    .then(hike => dispatch(receiveNewHike(hike)))
    .catch(err => console.log(err));
