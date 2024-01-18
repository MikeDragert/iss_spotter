const request = require('request-promise-native');


const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  const jBody = JSON.parse(body);
  return request("http://ipwho.is/" + jBody.ip);
};

const fetchISSFlyOVerTimesfuncton = function(body) {
  const jBody = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${jBody.latitude}&lon=${jBody.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOVerTimesfuncton)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
