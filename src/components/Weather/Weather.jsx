import { useState, useEffect } from "react";

const Weather = (props) => {

    const [temperature, setTemperature] = useState(0);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8e1a3c4200msh52f32f42215513fp1f5ed9jsn0cd5ca071458',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };

    useEffect(() => {
        fetch('https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=28.629195&lat=44.155182', options)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                // console.log(response.data[0].app_temp);
                setTemperature(response.data[0].app_temp);
            })
            .catch(err => console.error(err));
    }, []);

    return <p>Weather Constanta: {temperature}</p>
};

export default Weather;