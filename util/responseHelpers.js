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
      description: hike.description,
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

module.exports = { formatHikes, formatHike, formatUser }