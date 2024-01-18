const request = require('request');

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const jBody = JSON.parse(body);
    callback(null, jBody.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request("http://ipwho.is/" + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const jBody = JSON.parse(body);
    if (!jBody.success) {
      console.log(jBody);
      const msg = `Error: Success status was false.  Server message says: ${jBody.message} for ${jBody.ip}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, { latitude: jBody.latitude,
      longitude: jBody.longitude});

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const jBody = JSON.parse(body);
    callback(null, jBody.response);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return (error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return (error, null);
      }
      fetchISSFlyOverTimes(location, (error, data) => {
        if (error) {
          return (error, null);
        }
        callback(null, data);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };