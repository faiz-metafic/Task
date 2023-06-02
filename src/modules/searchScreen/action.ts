import axios from 'axios';

const apiKey = 'MSWldKcAiRtZK54zep5TMwddoF1BhaJwoofH2Ttl';

export const getRandomAstroid = async (
  successCallback: Function,
  failureCallback: Function,
) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`,
    );
    let randomNumber = Math.floor(Math.random() * 20);
    successCallback(response?.data?.near_earth_objects[randomNumber]);
  } catch {
    failureCallback();
  }
};

export const getAstroidData = async (
  id: string,
  successCallback: Function,
  failureCallback: Function,
) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`,
    );
    successCallback(response?.data);
  } catch {
    failureCallback();
  }
};
