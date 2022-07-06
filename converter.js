const axios = require("axios");
const key = "839d493e88e59309e84f4e4e35f4be37";

const convertAddressToCords = async (address) => {
  const result = await axios.get(
    `http://api.positionstack.com/v1/forward?access_key=${key}&query= ${address}`
  );
  const data = await result.data;
  if (!data.data[0]) {
    return {
      message: "error",
    };
  }
  return {
    lat: data.data[0].latitude,
    lng: data.data[0].longitude,
  };
};

module.exports = convertAddressToCords;
