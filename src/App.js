import React, { Component } from "react";
import axios from "axios";
import Results from "./components/Results";
import Daypicker from "./components/Daypicker";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            address: "",
            weather: {},
            astronomy: {},
            lat: "",
            lng: "",
            route: "",
            chartData: {},
            day: "0",
            date: "",
        };
    }

    // select day
    dayPickerHandler = e => {
        this.setState(
            {
                day: e.target.value,
            },
            () => this.resultlog()
        );
    };

    // places autocomplete
    onChange = address => {
        this.setState({
            address,
        });
    };

    // get location and convert to lat lng
    formSubmitHandler = event => {
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.getWeather(latLng))
            .catch(error => console.error("Error", error));
    };

    getWeather = latLng => {
        this.setState({
            lat: latLng.lat,
            lng: latLng.lng,
        });

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latLng.lat}&lon=${latLng.lng}&appid=f33d03be6862e5e82150c45691c13aed`
            )
            .then(response => {
                this.setState(
                    {
                        weather: response.data.list,
                    },
                    () => this.resultlog()
                );
            })
            .catch(error => {
                console.log(error);
            });
    };

    resultlog = () => {
        const weather = this.state.weather;

        let weatherTonight = [];

        switch (this.state.day) {
            case "0":
                weatherTonight = weather.slice(0, 9);
                break;
            case "1":
                weatherTonight = weather.slice(8, 17);
                break;
            case "2":
                weatherTonight = weather.slice(16, 25);
                break;
            case "3":
                weatherTonight = weather.slice(24, 33);
                break;
            case "4":
                weatherTonight = weather.slice(32, 41);
                break;
            default:
                weatherTonight = weather.slice(0, 8);
        }

        // const nightTimeWeather = weatherTonight.filter(
        //   (weatherHour) =>
        //     !(
        //       Number(weatherHour[0].dt_txt.slice(10, 13)) > 10 &&
        //       Number(weatherHour[0].dt_txt.slice(10, 13)) <= 20
        //     )
        // );

        const forecastTimes = [],
            cloudArray = [],
            humidityArray = [],
            windArray = [];
        weatherTonight.forEach(hourly => {
            let forecastTime = hourly.dt_txt.substring(11, 16);
            let cloud = hourly.clouds.all;
            let humidity = hourly.main.humidity;
            let wind = hourly.wind.speed;

            forecastTimes.push(forecastTime);
            cloudArray.push(cloud);
            humidityArray.push(humidity);
            windArray.push(wind);
        });

        this.setState({
            route: "display",
            chartData: {
                labels: forecastTimes,
                datasets: [
                    {
                        pointRadius: 0,
                        label: "Cloud cover (%)",
                        data: cloudArray,
                        borderColor: "red",
                    },
                    {
                        pointRadius: 0,
                        label: "Humidity (%)",
                        data: humidityArray,
                        borderColor: "rgb(255, 100, 0)",
                    },
                    {
                        pointRadius: 0,
                        label: "Wind speed (km/hr)",
                        data: windArray,
                        borderColor: "rgb(255, 0, 225)",
                    },
                ],
            },
        });
    };

    render() {
        // places autocomplete
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        };

        return (
            <main>
                <form className="searchform" onSubmit={this.formSubmitHandler}>
                    {/* <div className=""> */}
                    <PlacesAutocomplete inputProps={inputProps} />
                    {/* </div> */}
                    {/* <div className=""> */}
                    <Daypicker
                        dayPickerHandler={this.dayPickerHandler}
                        state={this.state.weather}
                    />
                    {/* </div>
                    <div className=""> */}
                    <button className="submit-button" type="submit">
                        Go
                    </button>
                    {/* </div> */}
                </form>

                <Results state={this.state} />
            </main>
        );
    }
}

export default App;
