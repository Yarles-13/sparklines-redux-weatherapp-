import React from "react";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";

const groupByDay = (list) => {
  const days = {};
  list.forEach((item) => {

    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
  });
  return days;
};


const calculateDailyAverages = (forecasts) => {
  const totalTemp = forecasts.reduce((sum, f) => sum + f.main.temp, 0);
  const totalPressure = forecasts.reduce((sum, f) => sum + f.main.pressure, 0);
  const totalHumidity = forecasts.reduce((sum, f) => sum + f.main.humidity, 0);

  const count = forecasts.length;
  return {
    avgTemp: (totalTemp / count).toFixed(2),
    avgPressure: (totalPressure / count).toFixed(2),
    avgHumidity: (totalHumidity / count).toFixed(2),
  };
};

const WeatherList = () => {
  const weatherData = useSelector((state) => state.weather.data);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weatherData || !weatherData.list || weatherData.list.length === 0)
    return <div>No results found. Please search again.</div>;

  const groupedData = groupByDay(weatherData.list);

  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Temp (°F)</th>
          <th>Pressure (hPa)</th>
          <th>Humidity (%)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedData).map(([day, forecasts], index) => {
          const { avgTemp, avgPressure, avgHumidity } = calculateDailyAverages(forecasts);

          return (
            <tr key={index}>
              <td>{day}</td>
              <td>
                <Sparklines data={forecasts.map((f) => f.main.temp)} width={100} height={50}>
                  <SparklinesLine color="orange" />
                  <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <p>{avgTemp} °F</p>
              </td>
              <td>
                <Sparklines data={forecasts.map((f) => f.main.pressure)} width={100} height={50}>
                  <SparklinesLine color="blue" />
                  <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <p>{avgPressure} hPa</p>
              </td>
              <td>
                <Sparklines data={forecasts.map((f) => f.main.humidity)} width={100} height={50}>
                  <SparklinesLine color="green" />
                  <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <p>{avgHumidity} %</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WeatherList;
