
import './App.css';

import WeatherList  from './components /WeatherList';
import SearchBar from './components /SearchBar';




function App() {
  return (
    <>
      <h1>Weather Forecast</h1>
     <SearchBar />
     <WeatherList />
    </>
  );
}

export default App;