import * as HikeAPIUtil from "../util/hike_api_util";

export const RECEIVE_HIKES = "RECEIVE_HIKES";
export const RECEIVE_HIKE = "RECEIVE_HIKE";
export const RECEIVE_USER_HIKES = "RECEIVE_USER_HIKES";
export const RECEIVE_NEW_HIKE = "RECEIVE_NEW_HIKE";
export const RECEIVE_HIKE_ERRORS = "RECEIVE_HIKE_ERRORS";
export const REMOVE_HIKE = "REMOVE_HIKE";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveHikes = hikes => ({
  type: RECEIVE_HIKES,
  hikes
});

export const receiveHike = hike => ({
  type: RECEIVE_HIKE,
  hike
});

export const receiveUserHikes = hikes => ({
  type: RECEIVE_USER_HIKES,
  hikes
});

export const receiveNewHike = hike => ({
  type: RECEIVE_NEW_HIKE,
  hike
});

export const receiveErrors = errors => ({
  type: RECEIVE_HIKE_ERRORS,
  errors
});

export const removeHike = hikeId => ({
  type: REMOVE_HIKE,
  hikeId
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const fetchHike = id => dispatch => 
  HikeAPIUtil.getHike(id)
    .then(hike => dispatch(receiveHike(hike)))
    .catch(err => console.log(err));


export const fetchHikes = () => dispatch =>
  HikeAPIUtil.getHikes()
    .then(hikes => dispatch(receiveHikes(hikes)))
    .catch(err => console.log(err));

export const fetchUserHikes = id => dispatch =>
  HikeAPIUtil.getUserHikes(id)
    .then(hikes => dispatch(receiveUserHikes(hikes)))
    .catch(err => console.log(err));

export const createHike = data => dispatch =>
  HikeAPIUtil.writeHike(data)
    .then(hike => dispatch(receiveNewHike(hike)))
    .catch(err => dispatch(receiveErrors(err.response.data)));

export const updateHike = hike => dispatch =>
  HikeAPIUtil.updateHike(hike)
    .then(hike => dispatch(receiveHike(hike)))
    .catch(err => dispatch(receiveErrors(err.response.data)));

export const deleteHike = id => dispatch =>
  HikeAPIUtil.deleteHike(id)
    .then(res => dispatch(removeHike(id)))
    .catch(err => dispatch(receiveErrors(err)));
