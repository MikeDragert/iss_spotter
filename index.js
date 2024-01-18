const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const passTime of passTimes) {
    console.log(`Next pass at ${Date(passTime.risetime)} for ${passTime.duration} seconds!`);
  }
});
