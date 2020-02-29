const formatHikes = hikesArr => {
  const hikes = {};
  hikesArr.forEach(hike => {
    const hikeData = {
      id: hike.id,
      trailheadName: hike.trailheadName,
      user: hike.user,
      state: hike.state,
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
    distance: hike.distance,
    elevationGain: hike.elevationGain,
    description: hike.description
  };
  return hikeData;
};

module.exports = { formatHikes, formatHike }