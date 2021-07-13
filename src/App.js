import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
import Loading from './Loading';

const API_KEY = 'b190a0605344cc4f3af08d0dd473dd25';

function App() {
  const dispatch = useDispatch();
  const { name, temp, temp_min, temp_max, description, icon, error } =
    useSelector((state) => state);

  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  // Get Weather Data 
  const getWeather = async () => {
    setLoading(true);
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await res.json();

    if (data.cod === 200) {
      setLoading(false);
      dispatch({ type: 'SET_WEATHER', payload: data });
    } else {
      setLoading(false);
      dispatch({ type: 'SET_ERROR', payload: data.message });
    }
  };

  const calcCelsuis = (temp) => {
    const celcuis = temp - 273.15;
    const result = celcuis.toFixed(2);
    return result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    dispatch({ type: 'CLEAN_STATE' });
  };

  return (
    <div className='container'>
      <div className='up'>
        <h1>hello weather news</h1>
      </div>
      <div className='down'>
        <h3>just type the city's name</h3>
        <h5>you must spell correctly</h5>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='type ...'
            value={city}
            onChange={handleChange}
          />
          <input type='submit' value='Find' />
        </form>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            <h3>{name}</h3>
            <img
              src={
                icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : ''
              }
              alt=''
            />

            <h3>{description}</h3>
            <h1>{temp ? calcCelsuis(temp) : 0}&deg;</h1>
            <div>
              <span>{temp_min ? calcCelsuis(temp_min) : 0}&deg;</span>
              <span>{temp_max ? calcCelsuis(temp_max) : 0}&deg;</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
