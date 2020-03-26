import axios from 'axios';

export const writeReview = data => {
  return axios.post('api/reviews/new', data);
}

export const getReview = id => {
  return axios.get(`/api/reviews/${id}`)
}

export const getUserReviews = id => {
  return axios.get(`/api/reviews/user/${id}`)
}

export const getHikeReviews = id => {
  return axios.get(`/api/reviews/hike/${id}`)
}

export const editReview = review => {
  return axios.patch(`/api/reviews/${review.id}/edit`)
}

export const deleteReview = id => {
  return axios.delete(`/api/reviews/${id}`)
}