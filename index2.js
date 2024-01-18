const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
// .then(body => fetchCoordsByIP(body))
// .then(body => fetchISSFlyOVerTimesfuncton(body))
// .then(body => console.log(body));

nextISSTimesForMyLocation()
  .then(passTimes => {
    for (const passTime of passTimes) {
      console.log(`Next pass at ${Date(passTime.risetime)} for ${passTime.duration} seconds!`);
    }
  })
  .catch(error => console.log("It didn't work", error.message));