import './Counter.css';
import React, {useState,useEffect} from 'react';

function Counter(){
    const [counter,setCounter] = useState(0);
    const [initialCount, setInitialCount] = useState(0);
    const [clicksByCity, setClicksByCity] = useState({});
    const handleInitialCountChange = (event) => {
       setInitialCount(event.target.value);
    };
    const handleReset = () => {
       setCounter(initialCount);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // Use a reverse geocoding API to get the city from the coordinates
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0b6488694c6141478332be75c6cb839a`)
                .then(response => response.json())
                .then(data => {
                    const city = data.results[0].components.city;
                    setClicksByCity(prevState => ({
                        ...prevState,
                        [city]: (prevState[city] || 0) + 1,
                    }));
                })
                .catch(error => console.error(error));
        });
    }, [counter]);

    return (
        <div className='counter-container'>
            <button onClick={() => setCounter(counter + 1)}>Click</button>
            <button onClick={handleReset}>Reset</button>
            <p>Count: {counter}</p>
            <div>
                <h2>Clicks by city</h2>
                <ul>
                    {Object.entries(clicksByCity).map(([city, count]) => (
                        <li key={city}>
                            {city}: {count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Counter;