const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
async function getForecastDataByName(cityName) {
  try {
    const data = await getDataFromDatabase();
    const cityData = data.find((city) => city.city.toLowerCase() === cityName.toLowerCase());

    if (!cityData) {
      throw new Error('City not found');
    }

    return cityData.forecast;
  } catch (error) {
    throw error; 
  }
}


module.exports = {
  getWeatherDataByName
};