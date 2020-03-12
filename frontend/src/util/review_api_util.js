import axios from 'axios';

export const writeReview = data => {
  return axios.post('api/reviews/new', data);
}