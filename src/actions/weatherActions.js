import axios from "axios";

const apiKey = "63168e96197ab571649bdefbef398926";
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial`;

export const FETCH = "FETCH";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

const fetchWeather = (city) => {
  return async (dispatch) => {
    dispatch({ type: FETCH });

    try {
      const url = `${ROOT_URL}&q=${city},us`;
      const res = await axios.get(url);

      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.error(
        "Fetch error:",
        error.response ? error.response.data : error.message
      );
      dispatch({
        type: ERROR,
        error: error.message,
      });
    }
  };
};

export default fetchWeather;

