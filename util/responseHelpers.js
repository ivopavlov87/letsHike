const formatHikes = hikesArr => {
  const hikes = {};
  hikesArr.forEach(hike => {
    const hikeData = {
      id: hike.id,
      trailheadName: hike.trailheadName,
      user: hike.user,
      state: hike.state,
      lat: hike.lat,
      lng: hike.lng,
      distance: hike.distance,
      elevationGain: hike.elevationGain,
      description: hike.description
    };
    hikes[hike.id] = hikeData;
  });

  return hikes;
};

const formatHike = hike => {
  const hikeData = {
    id: hike.id,
    trailheadName: hike.trailheadName,
    user: hike.user,
    state: hike.state,
    lat: hike.lat,
    lng: hike.lng,
    distance: hike.distance,
    elevationGain: hike.elevationGain,
    description: hike.description
  };
  return hikeData;
};

const formatUser = user => {
  const userData = {
    id: user.id,
    username: user.username,
    // email: user.email,
    // adminType: user.adminType,
    hikes: user.hikes
  };
  return userData;
};

const formatReviews = reviewsArr => {
  const reviews = {};
  reviewsArr.forEach(review => {
    const reviewData = {
      id: review.id,
      author: review.author,
      user: review.user,
      hike: review.hike,
      title: review.title,
      body: review.body,
      rating: review.rating,
      date: review.date
    };
    reviews[review.id] = reviewData;
  });

  return reviews;
};

const formatReview = review => {
  const reviewData = {
    id: review.id,
    author: review.author,
    user: review.user,
    hike: review.hike,
    title: review.title,
    body: review.body,
    rating: review.rating,
    date: review.date
  };
  return reviewData;
};

module.exports = { formatHikes, formatHike, formatUser, formatReview, formatReviews }